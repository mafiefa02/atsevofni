from datetime import date
from typing import Annotated, Optional

from pydantic import BaseModel, StringConstraints


class EquityBase(BaseModel):
    id: Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    name: str
    listedDate: date


class Equity(EquityBase):
    sectorId: Annotated[str, StringConstraints(to_upper=True)]
    sector: Annotated[str, StringConstraints(to_upper=True)]
    subsectorId: Annotated[str, StringConstraints(to_upper=True)]
    subsector: Annotated[str, StringConstraints(to_upper=True)]


class EquityFilterParams(BaseModel):
    search: Optional[Annotated[str, StringConstraints(strip_whitespace=True)]] = None
    sector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
    subsector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
