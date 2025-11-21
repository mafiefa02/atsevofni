from datetime import datetime
from typing import Annotated, Generic, Literal, Optional, TypeVar

from pydantic import BaseModel, ConfigDict, Field

from .configs import settings

T = TypeVar("T")


class SortParams(BaseModel):
    model_config = ConfigDict(validate_by_name=True, validate_by_alias=True)

    sort_by: Optional[str] = Field(default=None, alias="sortBy")
    order: Literal["desc", "asc"] = Field(default="desc")


class PaginationParams(BaseModel):
    model_config = ConfigDict(validate_by_name=True, validate_by_alias=True)

    enable_pagination: bool = Field(
        default=True, exclude=True, alias="enablePagination"
    )
    page: Annotated[int, Field(default=1, ge=1)]
    limit: Annotated[int, Field(default=settings.default_item_per_page, ge=1)]


class PaginationMeta(BaseModel):
    model_config = ConfigDict(validate_by_name=True, validate_by_alias=True)

    params: PaginationParams
    total_items: Annotated[int, Field(ge=0, alias="totalItems")]
    total_pages: Annotated[int, Field(ge=1, alias="totalPages")]


class ResponseMeta(BaseModel):
    model_config = ConfigDict(validate_by_name=True, validate_by_alias=True)

    pagination: Optional[PaginationMeta]
    last_updated: Annotated[datetime, Field(alias="lastUpdated")]


class CustomResponse(BaseModel, Generic[T]):
    data: T
    meta: ResponseMeta
