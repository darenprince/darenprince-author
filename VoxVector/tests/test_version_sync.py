from voxvector import __version__
from voxvector.pipeline import VoxVectorPipeline


def test_package_version_matches_pipeline_runtime():
    assert __version__ == VoxVectorPipeline.software_version == "0.2.26"
