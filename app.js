const ARTICLES = [
    "articles/example.txt"
]


async function loadArticle(path) {
    try {
        let response = await fetch(path);
        let text = await response.text();
        let lines = text.split('\n');

        let obj = {
            date: lines.shift().trim(), // Primera línea como "date"
            content: lines.join('\n') // Resto del contenido
        }
        console.log(obj);
        return obj;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadArticles() {
    let articles = []
    for (const path of ARTICLES) {
        let article = await loadArticle(path);
        articles.push(article);
    }
    return articles
}

async function main() {
    let articles = await loadArticles();
    const systemDate = new Date();
    const formattedDate = `${systemDate.getDate()}/${(systemDate.getMonth() + 1).toString().padStart(2, '0')}/${systemDate.getFullYear()}`;
    console.log("system date: " + formattedDate)
    document.getElementById("date").innerText = formattedDate;

    let todayArticle = null;
    articles.forEach(article => {
        if (article && article.date == formattedDate)
            todayArticle = article;
    });

    if (!todayArticle) {
        console.log("no article today");
        return;
    }

    document.getElementById("content-text").innerText = todayArticle.content;
}

window.onload = () => main();