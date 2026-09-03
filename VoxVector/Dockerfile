FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app/src

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY api/requirements.txt api/requirements-speech.txt /app/api/
RUN python -m pip install --upgrade pip \
    && python -m pip install -r /app/api/requirements.txt \
    && python -m pip install -r /app/api/requirements-speech.txt

COPY pyproject.toml /app/
COPY api /app/api
COPY src /app/src

EXPOSE 8000

CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
