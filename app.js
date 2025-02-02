const ARTICLES = [
    "articles/29_11_1996.txt",
    "articles/07_11_1996.txt",
    "articles/20_10_1996.txt",
    "articles/12_09_1996.txt",
    "articles/22_12_1996.txt",
    "articles/19_11_1996.txt",
    "articles/05_12_1996.txt",
    "articles/28_01_1997.txt",
    "articles/15_01_1997.txt",
    "articles/14_01_1997.txt",
    "articles/12_01_1997.txt"
]

const ADDS = [
    "img/adds/ImplanteCraneal.png",
    "img/adds/notienes.png",
    "img/adds/cangrejo2.png",
    "img/adds/ratas.png",
    "img/adds/huye.png",
    "img/adds/Harry.png",
]

const DELETE_DATE = {
    day: 1,
    month: 2,
    year: 1997
}
const deletedDate = new Date(DELETE_DATE.year, DELETE_DATE.month - 1, DELETE_DATE.day)

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

function displayDeleted()
{
    document.querySelectorAll('.deletable').forEach(d => d.classList.add('hidden'));
    let deleted = document.querySelector('.deleted')
    deleted.classList.remove('hidden');
    deleted.innerHTML = "¡¡ERROR FATAL!!: ESTE BLOG HA SIDO BORRADO EL " + 
        `${deletedDate.getDate()}/${(deletedDate.getMonth() + 1).toString().padStart(2, '0')}/${deletedDate.getFullYear()}`;
}



async function main() {

    const systemDate = new Date();
    const formattedDate = `${systemDate.getDate()}/${(systemDate.getMonth() + 1).toString().padStart(2, '0')}/${systemDate.getFullYear()}`;

    const detetedDate = new Date(DELETE_DATE.year, DELETE_DATE.month - 1, DELETE_DATE.day)

    if(systemDate.getTime() >= deletedDate.getTime())
    {
        displayDeleted();
    }
    else
    {
        let articles = await loadArticles();
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
    }


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