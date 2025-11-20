from datetime import date
from itertools import groupby
from typing import Annotated, Any, Dict, List, Optional

from fpdf import FPDF
from pydantic import BaseModel, Field, StringConstraints, model_validator

from src.domains.transactions.constants import (
    PDF_COLUMNS,
    PDF_PRICE_COLS,
    PDF_VOLUME_COLS,
)
from src.models import SortParams
from src.utils import format_idr, safe_num


class Price(BaseModel):
    equityId: Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    tradeDate: date
    opening: float
    high: float
    low: float
    closing: float
    bid: float
    offer: float
    volume: int


class PriceFilterParams(BaseModel):
    equities: Optional[
        List[Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]]
    ] = None
    sector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
    subsector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
    latest: bool = False
    start_date: Optional[date] = None
    end_date: Optional[date] = None

    @model_validator(mode="after")
    def check_dates(self):
        start = self.start_date
        end = self.end_date

        if start and end:
            if start > end:
                raise ValueError("start_date must be before or equal to end_date")

        return self


class GeneratePDFRequest(BaseModel):
    filters: PriceFilterParams = Field(default_factory=PriceFilterParams)
    sort: SortParams = Field(default_factory=SortParams)


class TransactionReportPDF(FPDF):
    """
    A PDF class that handles both the PDF structure (footers/pages)
    and the specific business logic for rendering the transaction reports.
    """

    def __init__(self, transactions: List[Dict[str, Any]], payload: GeneratePDFRequest):
        super().__init__(orientation="landscape")

        self.transactions = transactions
        self.payload = payload

        self.line_height = 7
        self.set_auto_page_break(auto=True, margin=15)
        self.alias_nb_pages()

        self.add_page()
        self.effective_width = self.w - self.l_margin - self.r_margin
        self.total_weight = sum(col[2] for col in PDF_COLUMNS)

    def footer(self):
        """Method to run automatically on every page, overriding FPDF's method."""
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def generate(self) -> bytes:
        """Generate the content and return bytes."""
        if not self.transactions:
            self._render_no_data_page()
            return self.output()

        self._render_report_header()

        is_first_ticker = True
        for ticker, group_iter in groupby(
            self.transactions, key=lambda x: x.get("equityId")
        ):
            if not is_first_ticker:
                self.add_page()
            is_first_ticker = False

            rows = list(group_iter)
            self._render_group(ticker, rows)

        self._render_grand_total()

        return self.output()

    def _render_no_data_page(self):
        """Renders a message when no transactions match filters."""
        self.set_font("Helvetica", size=16, style="B")
        self.cell(
            w=self.effective_width,
            h=10,
            text="Transaction Report",
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )

        self.ln(20)

        self.set_font("Helvetica", size=12)
        self.set_text_color(100, 100, 100)
        self.cell(
            w=self.effective_width,
            h=10,
            text="No transactions found for the selected period or filters.",
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )

        self.ln(5)
        active_filters = self.payload.filters.model_dump(exclude_none=True)
        filter_str = (
            ", ".join([f"{k}: {v}" for k, v in active_filters.items()]) or "None"
        )
        self.set_font("Helvetica", size=10, style="I")
        self.cell(
            w=self.effective_width,
            h=10,
            text=f"Applied Filters: {filter_str}",
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )

    def _render_report_header(self):
        dates = [t.get("tradeDate") for t in self.transactions if t.get("tradeDate")]
        period_subtitle = (
            f"Period: {min(dates)} to {max(dates)}" if dates else "Period: N/A"
        )

        self.set_font("Helvetica", size=16, style="B")
        self.cell(
            w=self.effective_width,
            h=10,
            text="Transaction Report",
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )

        self.set_font("Helvetica", size=11, style="I")
        self.cell(
            w=self.effective_width,
            h=4,
            text=period_subtitle,
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )

        self.set_font("Helvetica", size=9)
        self.set_text_color(80, 80, 80)
        active_filters = self.payload.filters.model_dump(exclude_none=True)
        filter_str = (
            ", ".join([f"{k}: {v}" for k, v in active_filters.items()]) or "None"
        )

        self.cell(
            w=self.effective_width,
            h=8,
            text=f"Filters: [{filter_str}]",
            new_x="LMARGIN",
            new_y="NEXT",
            align="C",
        )
        self.ln(4)

    def _render_group(self, ticker: str, rows: List[Dict]):
        self._render_group_title(ticker)
        self._render_table_headers()

        stats_data = {"highs": [], "lows": [], "closes": [], "volumes": []}

        self.set_font("Helvetica", size=9, style="")
        for row in rows:
            stats_data["highs"].append(safe_num(row.get("high")))
            stats_data["lows"].append(safe_num(row.get("low")))
            stats_data["closes"].append(safe_num(row.get("closing")))
            stats_data["volumes"].append(safe_num(row.get("volume")))

            self._render_row(row)

        self._render_group_stats(stats_data)

    def _render_group_title(self, ticker: str):
        self.set_text_color(0)
        self.set_fill_color(220, 230, 241)
        self.set_font("Helvetica", size=12, style="B")
        self.cell(
            w=self.effective_width,
            h=10,
            text=f"Ticker: {ticker}",
            border=1,
            new_x="LMARGIN",
            new_y="NEXT",
            fill=True,
            align="L",
        )

    def _render_table_headers(self):
        self.set_font("Helvetica", size=9, style="B")
        self.set_fill_color(240, 240, 240)
        for name, _, weight in PDF_COLUMNS:
            col_width = (weight / self.total_weight) * self.effective_width
            self.cell(
                w=col_width,
                h=self.line_height,
                text=name,
                border=1,
                align="C",
                fill=True,
            )
        self.ln(self.line_height)

    def _render_row(self, row: Dict):
        for _, key, weight in PDF_COLUMNS:
            col_width = (weight / self.total_weight) * self.effective_width
            raw_value = row.get(key, "")

            if key in PDF_PRICE_COLS:
                value = format_idr(raw_value, is_currency=True)
                align_type = "R"
            elif key in PDF_VOLUME_COLS:
                value = format_idr(raw_value, is_currency=False)
                align_type = "R"
            else:
                value = str(raw_value)
                align_type = "C"

            self.cell(
                w=col_width, h=self.line_height, text=value, border=1, align=align_type
            )
        self.ln(self.line_height)

    def _render_group_stats(self, stats: Dict):
        highs, lows, closes, volumes = (
            stats["highs"],
            stats["lows"],
            stats["closes"],
            stats["volumes"],
        )

        max_high = max(highs) if highs else 0
        min_low = min(lows) if lows else 0
        avg_close = sum(closes) / len(closes) if closes else 0
        total_vol = sum(volumes)
        avg_vol = total_vol / len(volumes) if volumes else 0

        stats_display = [
            ("Highest Price", format_idr(max_high, is_currency=True)),
            ("Lowest Price", format_idr(min_low, is_currency=True)),
            ("Avg Closing", format_idr(avg_close, is_currency=True)),
            ("Avg Daily Vol", format_idr(avg_vol, is_currency=False)),
            ("Total Volume", format_idr(total_vol, is_currency=False)),
        ]

        self.set_font("Helvetica", size=9, style="B")
        self.set_fill_color(250, 250, 250)

        stat_width = self.effective_width / len(stats_display)
        for label, value in stats_display:
            self.cell(
                w=stat_width,
                h=self.line_height,
                text=f"{label}: {value}",
                border=1,
                align="C",
                fill=True,
            )
        self.ln(self.line_height * 1.5)

    def _render_grand_total(self):
        grand_total = sum(safe_num(row.get("volume", 0)) for row in self.transactions)

        self.set_font("Helvetica", size=10, style="B")
        self.set_fill_color(50, 50, 50)
        self.set_text_color(255, 255, 255)
        self.cell(
            w=self.effective_width,
            h=10,
            text=f"GRAND TOTAL VOLUME: {format_idr(grand_total, is_currency=False)}",
            border=1,
            align="R",
            fill=True,
        )
