from datetime import date
from typing import Annotated, List, Optional

from pydantic import BaseModel, StringConstraints, model_validator


class Price(BaseModel):
    txtno: int
    portid: Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    portdate: date
    opening: float
    high: float
    low: float
    closing: float
    bid: float
    offer: float
    volume: int
    values: int


class PriceFilterParams(BaseModel):
    portids: Optional[
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
