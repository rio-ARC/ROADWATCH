from dataclasses import dataclass


@dataclass
class CivicDocument:
    title: str
    body: str
    source_url: str | None = None


def chunk_document(document: CivicDocument, chunk_size: int = 900) -> list[CivicDocument]:
    chunks: list[CivicDocument] = []
    for index in range(0, len(document.body), chunk_size):
        chunks.append(
            CivicDocument(
                title=f"{document.title} #{len(chunks) + 1}",
                body=document.body[index : index + chunk_size],
                source_url=document.source_url,
            )
        )
    return chunks
