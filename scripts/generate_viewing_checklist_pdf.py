"""Generate printable viewing checklist PDF for the blog hub."""
from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:
    import subprocess
    import sys

    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2", "-q"])
    from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "public" / "docs" / "checklist-prosmotr-doma.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

SECTIONS = [
    (
        "Планировка",
        [
            "Сверить число комнат, санузлов и проходов с планировкой",
            "Оценить размеры спален и кухни-гостиной под свою мебель",
            "Проверить высоту потолков и удобство дверных проёмов",
            "Посмотреть выход на террасу или во двор, если он заявлен",
        ],
    ),
    (
        "Отделка",
        [
            "Уточнить уровень отделки: черновая, предчистовая или чистовая",
            "Осмотреть стены, стяжку, откосы — без крупных трещин и отслоений",
            "Проверить окна и входную дверь: установка, открывание, уплотнители",
            "Спросить перечень работ в договоре или спецификации",
        ],
    ),
    (
        "Коммуникации",
        [
            "Электрика: щит, автоматы, выводы под розетки и свет",
            "Вода: скважина или центральный ввод, где точка ввода в дом",
            "Канализация: тип системы и готовность выпусков",
            "Газ: по границе или подведён, что нужно для подключения",
            "Отопление: контур тёплого пола / радиаторы — что уже сделано",
        ],
    ),
    (
        "Участок и подъезд",
        [
            "Площадь участка и границы: совпадают ли с документами",
            "Рельеф, сток воды, куда уходит дождевая вода",
            "Подъезд: покрытие дороги, парковка, удобство зимой",
            "Соседи, ограждение, шум и окружение в разное время дня",
        ],
    ),
    (
        "Вопросы продавцу",
        [
            "Что входит в цену и какие расходы остаются покупателю",
            "Какие документы на дом и участок готовы к сделке",
            "Есть ли гарантия и как обращаться по замечаниям",
            "Сроки сделки, ипотека, ключи и оставшиеся работы на объекте",
        ],
    ),
]


class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("DejaVu", "", 9)
        self.set_text_color(104, 113, 107)
        self.cell(0, 8, "Чек-лист просмотра дома — Кров-Сервис", align="R")
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(104, 113, 107)
        self.cell(0, 10, f"{self.page_no()}", align="C")


def main() -> None:
    font_candidates = [
        Path(r"C:\Windows\Fonts\arial.ttf"),
        Path(r"C:\Windows\Fonts\segoeui.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    font = next((p for p in font_candidates if p.exists()), None)
    if font is None:
        raise SystemExit("No TTF font found for Cyrillic PDF")

    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_font("DejaVu", "", str(font))
    pdf.add_font("DejaVu", "B", str(font))
    pdf.add_page()

    pdf.set_font("DejaVu", "B", 18)
    pdf.set_text_color(32, 60, 50)
    pdf.multi_cell(0, 9, "Что проверить на просмотре дома")
    pdf.ln(2)
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(32, 37, 34)
    pdf.multi_cell(
        0,
        6,
        "Планировка, отделка, коммуникации, участок и вопросы продавцу — "
        "в одном списке. Отметьте пункты на месте. Список не заменяет "
        "техническую и юридическую проверку.",
    )
    pdf.ln(4)

    box_w = 5
    for title, items in SECTIONS:
        pdf.set_font("DejaVu", "B", 13)
        pdf.set_text_color(32, 60, 50)
        pdf.cell(0, 8, title)
        pdf.ln(7)
        pdf.set_font("DejaVu", "", 11)
        pdf.set_text_color(32, 37, 34)
        for item in items:
            x = pdf.get_x()
            y = pdf.get_y()
            if y > 270:
                pdf.add_page()
                x = pdf.get_x()
                y = pdf.get_y()
            pdf.rect(x, y + 1.2, box_w, box_w)
            pdf.set_xy(x + box_w + 3, y)
            pdf.multi_cell(0, 6, item)
            pdf.ln(2)
        pdf.ln(3)

    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(104, 113, 107)
    pdf.multi_cell(
        0,
        5,
        "Кров-Сервис · dom-krovservice64.ru/blog/checklist/\n"
        "Сохраните файл или распечатайте перед выездом на объект.",
    )

    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
