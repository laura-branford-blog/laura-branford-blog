const ARTICLES = [
    "articles/example.txt"
]

const ADDS = [
    "img/adds/ImplanteCraneal.png",
    "img/adds/notienes.png",
    "img/adds/cangrejo2.png",
    "img/adds/ratas.png",
    "img/adds/huye.png",
    "img/adds/Harry.png",
]

async function loadArticle(path) {
    try {
        let response = await fetch(path);
        let text = await response.text();
        let lines = text.split('\n');

        let obj = {
            date: lines.shift().trim(),
            content: lines.join('\n')
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

    document.getElementById("content-text").innerHTML = todayArticle
    ? todayArticle.content
    : "No se encontraron entradas de blog para hoy.";

    

    document.querySelectorAll('.banner').forEach(banner => 
    {
        let randomAdd = ADDS[Math.floor(Math.random() * ADDS.length)];
        banner.src = randomAdd;
        banner.onclick = () => {
            window.open('http://virus-ruinoso.com/', '_blank');
        }
    }
    );
    
}

window.onload = () => main();