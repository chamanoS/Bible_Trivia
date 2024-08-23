export const fetchScripture = async (book, chapter, verse) => {
    const response = await fetch(`https://bible-api.com/${book}${chapter}:${verse}?translation=kjv`);
    return response.json();
  };
  