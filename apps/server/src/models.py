from typing import Annotated, Generic, Literal, Optional, TypeVar

from pydantic import BaseModel, Field

from .configs import settings

T = TypeVar("T")


class SortParams(BaseModel):
    sort_by: Optional[str] = None
    order: Literal["desc", "asc"] = "desc"


class PaginationParams(BaseModel):
    enable_pagination: bool = True
    page: Annotated[int, Field(ge=1)] = 1
    limit: Annotated[int, Field(ge=1)] = settings.default_item_per_page


class ResponseMeta(BaseModel):
    pagination: Optional[PaginationParams]
    total_items: Annotated[int, Field(ge=0)]
    total_pages: Annotated[int, Field(ge=1)]


class Response(BaseModel, Generic[T]):
    data: T
    meta: ResponseMeta
