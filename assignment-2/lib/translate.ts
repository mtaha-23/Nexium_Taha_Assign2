// lib/translate.ts

export function translateToUrdu(text: string): string {
  const dictionary: { [key: string]: string } = {
    "Artificial Intelligence": "مصنوعی ذہانت",
    "transforming": "تبدیل کر رہی ہے",
    "industry": "صنعت",
    "healthcare": "صحت کی دیکھ بھال",
    "education": "تعلیم",
    "potential": "صلاحیت",
    "endless": "لامحدود",
    "ethical concerns": "اخلاقی خدشات",
    "must be addressed": "کو حل کرنا ضروری ہے",
  }

  let translated = text
  for (const [en, ur] of Object.entries(dictionary)) {
    translated = translated.replace(new RegExp(en, "gi"), ur)
  }

  return translated
}
