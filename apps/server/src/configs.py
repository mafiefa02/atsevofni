from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Atsevofni Backend"
    app_health_check_route: str = "/health"
    default_item_per_page: int = 50
    app_rate_limit: str = "5/minutes"
    cors_origin: str

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.development", ".env.production", ".env.local"),
    )


settings = Settings()
