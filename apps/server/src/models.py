from datetime import datetime
from typing import Annotated, Generic, Literal, Optional, TypeVar

from pydantic import BaseModel, Field

from .configs import settings

T = TypeVar("T")


class SortParams(BaseModel):
    sort_by: Optional[str] = Field(default=None)
    order: Literal["desc", "asc"] = Field(default="desc")


class PaginationParams(BaseModel):
    enable_pagination: bool = Field(default=True, exclude=True)
    page: Annotated[int, Field(default=1, ge=1)]
    limit: Annotated[int, Field(default=settings.default_item_per_page, ge=1)]


class PaginationMeta(BaseModel):
    params: PaginationParams
    total_items: Annotated[int, Field(ge=0)]
    total_pages: Annotated[int, Field(ge=1)]


class ResponseMeta(BaseModel):
    pagination: Optional[PaginationMeta]
    last_updated: datetime


class CustomResponse(BaseModel, Generic[T]):
    data: T
    meta: ResponseMeta
