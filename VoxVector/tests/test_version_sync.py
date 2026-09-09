from pathlib import Path
import tomllib

from voxvector import __version__
from voxvector.pipeline import VoxVectorPipeline


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_package_version_matches_pipeline_runtime_and_manifest():
    manifest = tomllib.loads((PROJECT_ROOT / "pyproject.toml").read_text(encoding="utf-8"))
    assert manifest["project"]["version"] == __version__ == VoxVectorPipeline.software_version
