import sqlite3
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response, status
from fastapi_cache.decorator import cache

from src.configs import settings
from src.database import get_db_connection
from src.domains.transactions.constants import DEFAULT_SORT
from src.domains.transactions.models import GeneratePDFRequest, TransactionReportPDF
from src.domains.transactions.services import TransactionService
from src.middlewares import rate_limiter
from src.models import CustomResponse, PaginationParams, SortParams
from src.utils import get_current_time

from .models import Price, PriceFilterParams

router = APIRouter()


def get_transaction_service(
    db: Annotated[sqlite3.Connection, Depends(get_db_connection)],
) -> TransactionService:
    return TransactionService(db)


@router.get("", response_model=CustomResponse[List[Price]])
@cache(expire=180)
@rate_limiter.limit(settings.app_rate_limit)
def get_stocks(
    request: Request,
    filter_params: Annotated[PriceFilterParams, Query()],
    pagination_params: Annotated[PaginationParams, Depends()],
    sorting_params: Annotated[SortParams, Depends()],
    service: Annotated[TransactionService, Depends(get_transaction_service)],
):
    """Get all stock prices"""
    if sorting_params.sort_by is None:
        sorting_params.sort_by = DEFAULT_SORT

    return service.list_stocks(filter_params, pagination_params, sorting_params)


@router.post("/generate", status_code=status.HTTP_200_OK)
@rate_limiter.limit(settings.app_rate_limit)
async def generate_pdf(
    service: Annotated[TransactionService, Depends(get_transaction_service)],
    payload: GeneratePDFRequest | None = None,
):
    """
    Generates a PDF grouped by Ticker (equityId).
    """
    if payload is None:
        payload = GeneratePDFRequest()

    try:
        transactions = service.get_report_data(payload)
        pdf_bytes = TransactionReportPDF(transactions, payload).generate()

        filename = f"transactions_grouped_{get_current_time()}.pdf"

        headers = {
            "Content-Disposition": f"attachment; filename={filename}",
            "Content-Type": "application/pdf",
        }

        return Response(
            content=bytes(pdf_bytes), headers=headers, media_type="application/pdf"
        )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while generating the PDF.",
        )
