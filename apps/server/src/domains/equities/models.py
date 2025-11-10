from datetime import date
from typing import Annotated, List, Optional

from pydantic import BaseModel, StringConstraints


class Equity(BaseModel):
    portid: Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    portname: str
    sectorid: Annotated[str, StringConstraints(to_upper=True)]
    sector: Annotated[str, StringConstraints(to_upper=True)]
    subsector: Annotated[str, StringConstraints(to_upper=True)]
    subsectorid: Annotated[str, StringConstraints(to_upper=True)]
    listeddate: date


class EquityFilterParams(BaseModel):
    search: Optional[List[Annotated[str, StringConstraints(strip_whitespace=True)]]] = (
        None
    )
    sector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
    subsector: Optional[
        Annotated[str, StringConstraints(to_upper=True, strip_whitespace=True)]
    ] = None
