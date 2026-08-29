# Public release validation / Проверка публичного релиза

## RU

Полный private development archive содержит значительно более крупную историческую QA-цепочку. GitHub-clean release намеренно не включает этот объём и оставляет одну self-contained public-release проверку.

Запуск из корня репозитория:

```bash
python validation/public_release_check.py
```

Проверяются frozen `data.js` hash, разделение product/core versions, обязательные публичные файлы, финальные research results, локальные ссылки основных HTML-страниц, отсутствие выбранных private benchmark secret markers и публичный SHA-256 manifest.

---

## EN

The full private development archive contains a much larger historical QA trail. The GitHub-clean release intentionally omits that bulk and retains one self-contained public-release check.

Run from the repository root:

```bash
python validation/public_release_check.py
```

The check verifies the frozen `data.js` hash, product/core version split, required public files, final research results, local links in the canonical HTML pages, absence of selected private benchmark secret markers, and the public SHA-256 manifest.
