// Franchesca Zyreen Sison (MFC Units - October 2026)

// this waits for the whole html to finish loading first, so the js can find all the buttons and pictures
document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded = "the page is ready", everything inside runs after that

    // part 1, the hamburger menu on phones
    const hamburger = document.querySelector(".hamburger"); // finds the 3-line menu button in the html and saves it as "hamburger"
    const mainNav = document.querySelector(".main-nav"); // finds the menu links box and saves it as "mainNav"

    if (hamburger && mainNav) { // only run if BOTH exist (so the js does not crash if one is missing)
        hamburger.addEventListener("click", function () { // when the hamburger is clicked, do the next line
            mainNav.classList.toggle("open"); // toggle = add the "open" class if it is not there, remove it if it is there (css uses "open" to show or hide the menu)
        }); // end of the click
    } // end of the if

    // part 2, show which menu link is the page you are on now
    const currentPath = window.location.pathname.split("/").pop() || "index.html"; // gets the file name from the address (like "about.html"), split cuts the address at every "/", pop takes the last piece, and if it is empty it uses "index.html"
    const navLinks = document.querySelectorAll(".nav-link"); // finds ALL the menu links (querySelectorAll finds many, not just one)

    navLinks.forEach(link => { // goes through the menu links one by one, "link" is the one it is looking at now
        const href = link.getAttribute("href"); // gets the address that the link goes to (like "about.html")
        if (href === currentPath || (currentPath === "" && href === "index.html")) { // if the link goes to the page I am on now (or I am on the empty home address and the link is index.html)
            link.classList.add("active"); // add the "active" class so css can highlight it
        } else { // if it is not the page I am on
            link.classList.remove("active"); // remove the "active" class so it is not highlighted
        } // end of the if else
    }); // end of the loop

    // part 3, the unit page gallery (the arrows and the thumbnails)
    const cards = document.querySelectorAll(".unit-card"); // finds ALL the unit cards (bedspace, kitchen, bathroom, amenities), on other pages it finds nothing so nothing runs

    cards.forEach(card => { // goes through the cards one by one, so each card has its own gallery that works alone
        const mainImg = card.querySelector(".main-gallery-img"); // finds the big picture inside this card
        // finds all the small thumbnails in this card (the computer ones AND the phone ones)
        const thumbs = card.querySelectorAll(".thumb-img"); // saves all the thumbnails in a list
        const prevBtn = card.querySelector(".prev-arrow"); // finds the left arrow of this card
        const nextBtn = card.querySelector(".next-arrow"); // finds the right arrow of this card

        if (!mainImg || thumbs.length === 0) return; // if this card has no big picture or no thumbnails, skip it (return stops here and moves to the next card)

        let currentIndex = 0; // remembers which picture is showing now, 0 means the first picture ("let" is used because this number will change)

        function updateGallery(index) { // a function = a saved set of steps, this one changes the picture, "index" is the number of the picture I want
            // the thumbnails are listed twice in the html (computer + phone), so I count them in sets of 5 to keep the numbers in sync
            const setSize = 5; // there are 5 pictures in one set
            const localIndex = index % setSize; // % gives the leftover after dividing, so 5 becomes 0 and 7 becomes 2 (this keeps the number inside 0 to 4)

            if (localIndex < 0) { // if the number went below 0 (clicked the left arrow on the first picture)
                currentIndex = setSize - 1; // go to the last picture (5 - 1 = 4)
            } else if (localIndex >= setSize) { // if the number went past the last picture
                currentIndex = 0; // go back to the first picture
            } else { // if the number is normal
                currentIndex = localIndex; // just use it
            } // end of the if else

            const newSrc = thumbs[currentIndex].getAttribute("src"); // gets the picture file name of the thumbnail I picked (like "images/unit-bedroom-2.jpg")
            mainImg.src = newSrc; // puts that picture in the big picture

            // updates which thumbnail is highlighted, in both the computer and phone sets
            thumbs.forEach((thumb, idx) => { // goes through the thumbnails one by one, "idx" is its number
                if ((idx % setSize) === currentIndex) { // if this thumbnail is the same picture as the one showing now (the % makes the phone copy match the computer copy)
                    thumb.classList.add("active"); // highlight it
                } else { // if it is not the one showing
                    thumb.classList.remove("active"); // remove the highlight
                } // end of the if else
            }); // end of the thumbnails loop
        } // end of the updateGallery function

        thumbs.forEach((thumb, idx) => { // goes through the thumbnails again to make each one clickable
            thumb.addEventListener("click", function () { // when a thumbnail is clicked
                updateGallery(idx); // show the picture of that thumbnail
            }); // end of the click
        }); // end of the loop

        if (prevBtn) { // only if the left arrow exists
            prevBtn.addEventListener("click", function () { // when the left arrow is clicked
                updateGallery(currentIndex - 1); // go to the picture before the current one
            }); // end of the click
        } // end of the if

        if (nextBtn) { // only if the right arrow exists
            nextBtn.addEventListener("click", function () { // when the right arrow is clicked
                updateGallery(currentIndex + 1); // go to the picture after the current one
            }); // end of the click
        } // end of the if
    }); // end of the cards loop

    // part 4, the English / Tagalog button (works on the home, location and unit pages)
    const langToggleBtn = document.getElementById("langToggleBtn"); // finds the language button using its id (only some pages have it)

    const disclaimerContent = document.getElementById("disclaimerContent"); // the text box on the home page
    const wayAroundContent = document.getElementById("wayAroundContent");   // the text box on the location page
    const unitDetailsContent = document.getElementById("unitDetailsContent"); // the text box on the unit page

    if (langToggleBtn) { // only run this part if the page has the language button (the about, guidelines and faqs pages do not)
        let currentLang = "en"; // remembers the language now, "en" = English (it starts in English)

        // home page texts, English (const = a saved text that does not change)
        const homeEnglishText1 = "This website is an independent, personal informational guide created solely for our family's private condo unit. It is not affiliated with, endorsed by, or an official website of the building administration, property developer, or external map services. All details provided here are curated specifically to help our current and future tenants access unit information easily."; // first English paragraph
        const homeEnglishText2 = "As the owner maintains a busy schedule, we kindly encourage you to check this site first for answers regarding the unit, rules, and guidelines. If you need further assistance, please feel free to message us directly via our official Facebook Messenger tenant group chat or individual accounts. Thank you!"; // second English paragraph

        const homeTagalogText1 = "Ang website na ito ay isang gabay na impormasyon na ginawa para lamang sa private condo unit ng aming pamilya. Hindi ito konektado, inendorso, o opisyal na website ng building administration, property developer, o alinmang external map services. Ang lahat ng detalye rito ay inihanda para mas madaling mahanap ng aming mga kasalukuyan at hinaharap na tenant ang mga impormasyon tungkol sa unit."; // first Tagalog paragraph
        const homeTagalogText2 = "Dahil medyo abala po ang owner, pakiusap na tingnan muna ang website na ito para sa inyong mga katanungan ukol sa unit, mga rules, at guidelines. Kung meron po kayong karagdagang tanong, pwede po kayong mag-message sa amin nang direkta sa ating opisyal na Facebook Messenger tenant group chat o sa aming mga personal na account. Maraming salamat po!"; // second Tagalog paragraph

        // location page texts
        const locEnglishText1 = "Navigating around the area is very convenient, with plenty of public jeepneys, buses, UV Express vans, and tricycles passing through nearby streets to take you to these destinations and surrounding universities."; // first English paragraph
        const locEnglishText2 = "As routes and jeepney signboards can vary depending on where you are heading, we recommend checking your exact destination on Google Maps or asking local drivers/guards for the best direct route. The interactive maps above are pinned for the specific key landmarks and schools listed here to help you get started easily!"; // second English paragraph

        const locTagalogText = "Madali lang mag-commute mula sa condo! Maraming jeep, bus, UV Express, at tricycle na dumadaan sa mga kalsada papunta sa mga sikat na pasyalan at malalapit na school.<br><br>Dahil paiba-iba ang mga ruta at signboard ng jeep depende sa iyong pupuntahan, magandang i-check muna ang exact spot sa Google Maps o magtanong sa mga local driver at guard para sa pinakamabilis na daan. Naka-pin na rin sa interactive maps sa itaas ang mga key landmark at school para mas madali kang makapunta sa iyong pupuntahan!"; // the Tagalog text, the 2 paragraphs are in one text and the <br><br> makes an empty line between them

        // unit page texts, these are html (with the list tags) so they use backticks ` ` which let me write many lines
        const unitEnglishHTML = `
            <ul class="star-list light-star-list">
                <li>★ Some items in the photos (such as table covers, foam covers, or chairs) may change from time to time, but the overall structure and inclusions remain the same.</li>
                <li>★ The owner will always inform you beforehand if any fixture or appliance requires maintenance or repairs.</li>
                <li>★ Current Notice: Please note that the lower kitchen cabinet is currently undergoing repairs and is temporarily not working as expected. We appreciate your patience while this is being finalized!</li>
            </ul>
        `; // the English list (same as the one in unit.html)

        const unitTagalogHTML = `
            <ul class="star-list light-star-list">
                <li>★ Ang ibang gamit sa picture (tulad ng table cover, foam cover, o upuan) ay pwedeng magbago, pero pareho pa rin ang kabuuang ayos at mga bagay na kasama sa unit.</li>
                <li>★ Ipapaalam lagi nang maaga ng may-ari sa tenant kung may kailangang i-maintain o ipagawang gamit o appliance.</li>
                <li>★ Paalala lang po: Ang cabinet sa ilalim ng kusina ay kasalukuyang inaayos at pansamantalang hindi pa buong magamit. Maraming salamat sa inyong pag-unawa!</li>
            </ul>
        `; // the Tagalog list

        langToggleBtn.addEventListener("click", function () { // when the language button is clicked
            if (currentLang === "en") { // if the page is in English now, switch to Tagalog
                currentLang = "tl"; // remember that it is Tagalog now ("tl" = Tagalog)
                langToggleBtn.innerHTML = `English / <strong>Tagalog</strong>`; // changes the button text, Tagalog becomes the bold one

                if (disclaimerContent) { // if this is the home page
                    disclaimerContent.innerHTML = `<p>${homeTagalogText1}</p><p>${homeTagalogText2}</p>`; // replaces the text with the 2 Tagalog paragraphs, ${ } puts my saved text inside
                } else if (wayAroundContent) { // if this is the location page
                    wayAroundContent.innerHTML = `<p>${locTagalogText}</p>`; // replaces the text with the Tagalog text
                } else if (unitDetailsContent) { // if this is the unit page
                    unitDetailsContent.innerHTML = unitTagalogHTML; // replaces the list with the Tagalog list
                } // end of the page checks
            } else { // if the page is in Tagalog now, switch back to English
                currentLang = "en"; // remember that it is English now
                langToggleBtn.innerHTML = `<strong>English</strong> / Tagalog`; // changes the button text, English becomes the bold one

                if (disclaimerContent) { // if this is the home page
                    disclaimerContent.innerHTML = `<p>${homeEnglishText1}</p><p>${homeEnglishText2}</p>`; // puts back the 2 English paragraphs
                } else if (wayAroundContent) { // if this is the location page
                    wayAroundContent.innerHTML = `<p>${locEnglishText1}</p><p>${locEnglishText2}</p>`; // puts back the 2 English paragraphs
                } else if (unitDetailsContent) { // if this is the unit page
                    unitDetailsContent.innerHTML = unitEnglishHTML; // puts back the English list
                } // end of the page checks
            } // end of the if else
        }); // end of the button click
    } // end of the if for the language button

    // part 5, the FAQs dropdown (the questions open and close, and the star changes ☆ and ★)
    const accordionItems = document.querySelectorAll('.faq-accordion-item'); // finds ALL the question boxes, on other pages it finds nothing so nothing runs

    accordionItems.forEach(item => { // goes through the question boxes one by one, "item" is the one it is looking at now
        const button = item.querySelector('.faq-question-btn'); // finds the clickable question bar inside this box
        const starSpan = item.querySelector('.faq-star'); // finds the star inside this box

        button.addEventListener('click', () => { // when the question bar is clicked (() => { } is just a shorter way to write function() { })
            const isActive = item.classList.contains('active'); // checks if this box already has the "active" class (true = it is open now, false = it is closed now)
            if (isActive) { // if it is open now
                // close it and change the star back to the outline star
                item.classList.remove('active'); // removes the "active" class, so the css hides the answer again
                button.setAttribute('aria-expanded', 'false'); // tells screen readers that it is closed now
                starSpan.innerHTML = '☆'; // changes the star to the outline star
            } else { // if it is closed now
                // open it and change the star to the solid star
                item.classList.add('active'); // adds the "active" class, so the css shows the answer
                button.setAttribute('aria-expanded', 'true'); // tells screen readers that it is open now
                starSpan.innerHTML = '★'; // changes the star to the solid star
            } // end of the if else
        }); // end of the click
    }); // end of the loop
}); // end of the DOMContentLoaded (the one and only, everything above is inside it)