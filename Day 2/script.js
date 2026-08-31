/* ================================================= */
/* GLOBAL VARIABLES */
/* ================================================= */


/*
    Gets the music element from HTML.
*/
const music =
    document.getElementById("music");


/*
    Tracks whether music is playing.
*/
let musicPlaying = false;


/*
    Tracks how many gifts
    have been opened.
*/
let openedGifts = 0;


/*
    Prevents the final animation
    from being triggered repeatedly.
*/
let finalCelebration = false;


/* ================================================= */
/* SCREEN CHANGING */
/* ================================================= */


/*
    This function switches
    between our different pages.
*/
function showScreen(id) {

    /*
        Find every screen.
    */
    const screens =
        document.querySelectorAll(".screen");


    /*
        Hide every screen.
    */
    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    /*
        Find requested screen.
    */
    const target =
        document.getElementById(id);


    /*
        Show requested screen.
    */
    target.classList.add("active");

}


/* ================================================= */
/* START EXPERIENCE */
/* ================================================= */


function startExperience() {

    /*
        Try to start music.

        Because this happens after
        a button click, mobile browsers
        normally allow it.
    */
    music.play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch(() => {

            console.log(
                "Music could not start."
            );

        });


    /*
        Create a few floating hearts.
    */
    createHearts(8);


    /*
        Move to first question.
    */
    setTimeout(() => {

        showScreen("screen2");

    }, 300);

}


/* ================================================= */
/* MUSIC */
/* ================================================= */


function toggleMusic() {

    /*
        If music is playing,
        stop it.
    */
    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    }

    /*
        Otherwise start it.
    */
    else {

        music.play();

        musicPlaying = true;

    }


    /*
        Update icon.
    */
    updateMusicButton();

}


/*
    Changes the music icon.
*/
function updateMusicButton() {

    const button =
        document.getElementById("musicButton");


    if (musicPlaying) {

        button.innerText = "♫";

    }

    else {

        button.innerText = "🔇";

    }

}


/* ================================================= */
/* QUESTION */
/* ================================================= */


function chooseAnswer(answer) {

    /*
        Find all answer buttons.
    */
    const buttons =
        document.querySelectorAll(".option");


    /*
        Disable buttons temporarily.
    */
    buttons.forEach(button => {

        button.style.pointerEvents =
            "none";

    });


    /*
        Make the chosen answer
        visually larger.
    */
    buttons[answer - 1].style.background =
        "#ffe0e8";


    /*
        Wait a moment before revealing result.
    */
    setTimeout(() => {

        showScreen("screen3");

        createHearts(12);

    }, 500);

}


/* ================================================= */
/* LOVE METER */
/* ================================================= */


function showLoveMeter() {

    showScreen("screen4");


    /*
        Reset meter.
    */
    const percentage =
        document.getElementById(
            "percentage"
        );


    const ring =
        document.getElementById(
            "progressRing"
        );


    percentage.innerText = "0";


    ring.style.strokeDashoffset =
        "597";


    /*
        Start the percentage animation
        after the screen appears.
    */
    setTimeout(() => {

        animatePercentage(
            100,
            2000
        );


        /*
            Circle circumference:

            2 × π × radius

            radius = 95

            ≈ 597

        */
        setTimeout(() => {

            ring.style.strokeDashoffset =
                "0";

        }, 100);


    }, 400);

}


/*
    Animates number from
    0 → target.
*/
function animatePercentage(
    target,
    duration
) {

    const element =
        document.getElementById(
            "percentage"
        );


    const message =
        document.getElementById(
            "meterMessage"
        );


    const button =
        document.getElementById(
            "meterButton"
        );


    let start = 0;


    /*
        How much the number
        increases per frame.
    */
    const increment =
        target /
        (duration / 20);


    const timer =
        setInterval(() => {

            start += increment;


            if (start >= target) {

                start = target;

                clearInterval(timer);


                /*
                    Finished.
                */
                message.innerText =
                    "Okay... that's a lot of love. ❤️";


                button.classList.remove(
                    "hidden"
                );


                createHearts(15);

            }


            element.innerText =
                Math.floor(start);

        }, 20);

}


/* ================================================= */
/* BOUQUET */
/* ================================================= */


function showBouquet() {

    showScreen("screen5");

    createHearts(10);

}


/* ================================================= */
/* GIFTS */
/* ================================================= */


function showGifts() {

    showScreen("screen6");

}


/* ================================================= */
/* OPEN GIFT */
/* ================================================= */


function openGift(number) {

    /*
        Find surprise elements.
    */
    const title =
        document.getElementById(
            "surpriseTitle"
        );


    const content =
        document.getElementById(
            "surpriseContent"
        );


    const icon =
        document.getElementById(
            "surpriseIcon"
        );


    const eyebrow =
        document.getElementById(
            "surpriseEyebrow"
        );


    /*
        GIFT ONE
    */
    if (number === 1) {

        icon.innerText = "😊";

        eyebrow.innerText =
            "Oh who's this?";

        title.innerText =
            "Someone wants to give you flowers";


        content.innerHTML = `

            <img
                src="assets/photo1.jpg"
                class="surprise-image"
                alt="Spidey"
            >

            <p>
                For being so strong everytime 
		and still keep going.❤️
            </p>

        `;

    }


    /*
        GIFT TWO
    */
    else if (number === 2) {

        icon.innerText = "💌";

        eyebrow.innerText =
            "something I wanted to say";

        title.innerText =
            "A little message";


        content.innerHTML = `

            <p class="quote">

                "If I had to choose
                one person to annoy
                for the rest of my life...

                <br><br>

                it'd probably be you."

                <br><br>

                ❤️

            </p>

        `;

    }


    /*
        GIFT THREE
    */
    else {

        icon.innerText = "✨";

        eyebrow.innerText =
            "(Obv, I had to include him)";

        title.innerText =
            "Hnji kive lageya twannu ye";


        content.innerHTML = `

            <img
                src="assets/photo3.jpg"
                class="surprise-image"
                alt="Special memory"
            >

            <p>

                YE BANDA KESE PICHE REHLEGA 💗

                ❤️

            </p>

            <button
                class="main-button"
                onclick="showFinal()"
            >

                One last thing →

            </button>

        `;

    }


    /*
        Count this gift as opened.

        Only count each gift once.
    */
    if (
        !window[
            "gift" + number + "Opened"
        ]
    ) {

        window[
            "gift" + number + "Opened"
        ] = true;

        openedGifts++;

    }


    /*
        Update counter.
    */
    document.getElementById(
        "giftCounter"
    ).innerText =
        openedGifts + " / 3 opened";


    /*
        Show surprise.
    */
    showScreen("screen7");


    /*
        Add hearts.
    */
    createHearts(10);

}


/* ================================================= */
/* BACK TO GIFTS */
/* ================================================= */


function showFinal() {

    showScreen("screen8");

    createHearts(25);

}


/* ================================================= */
/* HEART PARTICLES */
/* ================================================= */


function createHearts(amount) {

    /*
        Different symbols.
    */
    const symbols = [

        "♥",

        "♡",

        "💕",

        "💗",

        "✨",

        "🌸"

    ];


    /*
        Create requested amount.
    */
    for (
        let i = 0;
        i < amount;
        i++
    ) {

        /*
            Create new div.
        */
        const heart =
            document.createElement("div");


        /*
            Give it class.
        */
        heart.className =
            "heart-particle";


        /*
            Pick random symbol.
        */
        heart.innerText =
            symbols[
                Math.floor(
                    Math.random()
                    * symbols.length
                )
            ];


        /*
            Random horizontal position.
        */
        heart.style.left =
            Math.random() * 100 + "vw";


        /*
            Random size.
        */
        heart.style.fontSize =
            (
                14 +
                Math.random() * 22
            ) + "px";


        /*
            Random speed.
        */
        heart.style.animationDuration =
            (
                3 +
                Math.random() * 3
            ) + "s";


        /*
            Add it to page.
        */
        document.body.appendChild(
            heart
        );


        /*
            Delete it later
            to prevent memory buildup.
        */
        setTimeout(() => {

            heart.remove();

        }, 6500);

    }

}


/* ================================================= */
/* FINAL CELEBRATION */
/* ================================================= */


function celebrate() {

    /*
        Don't repeatedly create
        thousands of hearts.
    */
    if (finalCelebration) {

        return;

    }


    finalCelebration = true;


    /*
        Massive heart explosion.
    */
    createHearts(80);


    /*
        Continue smaller waves.
    */
    setTimeout(() => {

        createHearts(50);

    }, 1000);


    setTimeout(() => {

        createHearts(50);

    }, 2000);

}