const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/user/:user", async (req, res) => {
    console.log("getting");
    // ${req.query.user}
    const response = await getInfo(req.params.user);
    // const result = await response.text();

    if (response.status === 200) {
        const result = await response.text();

        const info = loadData(result);
        res.send(info);
    } else {
        res.send({ error: "profile not found" });
    }
    // loadData(result);
});
// basicUserDetails_head--hrLine__alV_t
const getInfo = async (e) => {
    const url = await fetch(`https://www.geeksforgeeks.org/user/${e}/`);

    return url;
};

const loadData = (user) => {
    const $ = cheerio.load(user);

    const $username = $(
        ".profilePicSection_head_userHandleAndFollowBtnContainer_userHandle__p7sDO"
    ).text();
    const $university = $(".educationDetails_head_left--text__tgi9I").text();

    let score = {};

    $(".scoreCard_head_card_left--score__pC6ZA").each(function (i, elem) {
        const text = $(this).text();
        score[
            i === 0
                ? "codingScore"
                : i === 1
                ? "totalSolved"
                : "monthlyCodingScore"
        ] = parseInt(text);
    });

    const $rank = $(
        ".profilePicSection_head_userRankContainer_rank__abngM b"
    ).text();
    const $streak = $(
        ".circularProgressBar_head_mid_streakCnt--glbLongStreak__viuBP"
    )
        .parent()
        .text();

    const $langUsed = $(".educationDetails_head_right--text__lLOHI").text();

    const $profile = $(".profilePicSection_head_imageCircle___9Hak").text();

    const $one = cheerio.load($profile);
    let $pic = "";
    $one("img").each(function () {
        $pic = $(this).attr("src");
    });

    let $campusAmbassador = "";
    $("hr.basicUserDetails_head--hrLine__alV_t").each(function () {
        $campusAmbassador = $(this).next().text();
    });

    // For getting count of solved problems for each category

    const numbers = [];

    $("div.problemNavbar_head_nav--text__UaGCx").each((index, element) => {
        const text = $(element).text().replace(/\D/g, "");

        numbers.push(parseInt(text));
    });

    const lists = [];

    $("ul.problemList_head_list__guE6e").each((index, element) => {
        // Initialize an array to store the text of <li> elements in this list
        const listItems = [];

        // Select all <li> elements within this <ul>
        $(element)
            .find("li.problemList_head_list_item__RlO_s")
            .each((i, el) => {
                // Push the text content of each <li> to the array
                const problem = $(el).text();
                const problemLink = $(el).find("a").attr("href");
                // listItems.push($(el).text());
                listItems.push({ problem, problemLink });
            });

        // Push the array of <li> text content to the main array
        lists.push(listItems);
    });
    const solvedStats = {
        school: {
            count: numbers[0],
            problems: typeof lists[1] !== "undefined" ? lists[1] : [],
        },
        basic: {
            count: numbers[1],
            problems: typeof lists[3] !== "undefined" ? lists[3] : [],
        },
        easy: {
            count: numbers[2],
            problems: typeof lists[0] !== "undefined" ? lists[0] : [],
        },
        medium: {
            count: numbers[3],
            problems: typeof lists[2] !== "undefined" ? lists[2] : [],
        },
        hard: {
            count: numbers[4],
            problems: typeof lists[4] !== "undefined" ? lists[4] : [],
        },
    };

    let result = {};
    const info = {
        profile: "https://www.geeksforgeeks.org" + $pic,
        username: $username,
        University: $university,
        streak: $streak,
        score: score,
        rank: parseInt($rank),
        languagesUsed: $langUsed,
        isCampusAmbassador:
            $campusAmbassador === "Apply for Campus Ambassador"
                ? false
                : $campusAmbassador === ""
                ? false
                : true,
    };

    result = { info: info, solvedProblems: solvedStats };
    console.log(result);
    return result;
};

app.listen(5000, () => {
    console.log("post listening at 5000");
});
