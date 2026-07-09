AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

/* NAVBAR SCROLL & ACTIVE LINK  */
window.addEventListener('scroll', function () {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 300);
    document.querySelectorAll('section[id]').forEach(function (sec) {
        var top = sec.offsetTop - 110,
            bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            document.querySelectorAll('.nav-link').forEach(function (l) {
                l.classList.remove('active');
            });
            var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (lnk) lnk.classList.add('active');
        }
    });
});

/*  SMOOTH SCROLL + MOBILE NAV CLOSE  */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            // Close Bootstrap mobile navbar if open
            var navCollapse = document.getElementById('navmenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            // Scroll after slight delay to let navbar close
            setTimeout(function () {
                window.scrollTo({
                    top: t.offsetTop - 78,
                    behavior: 'smooth'
                });
            }, 50);
        }
    });
});


// var searchOv = document.getElementById('searchOv');

// document.getElementById('navSearchBtn').addEventListener('click', function () {
//     searchOv.classList.add('open');
//     document.body.style.overflow = 'hidden';
//     setTimeout(function () {
//         document.getElementById('searchInput').focus();
//     }, 220);
// });

// document.getElementById('searchClose').addEventListener('click', closeSearch);

// // Close when clicking backdrop
// searchOv.addEventListener('click', function (e) {
//     if (e.target === searchOv) closeSearch();
// });

function closeSearch() {
    searchOv.classList.remove('open');
    document.body.style.overflow = '';
}

// Category buttons inside search box
document.querySelectorAll('.sovcat').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.sovcat').forEach(function (b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var f = this.getAttribute('data-cat');
        closeSearch();
        setTimeout(function () {
            filterMenu(f);
            document.getElementById('menu').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

// Trending tags fill the search input
document.querySelectorAll('.sovtrend .ttag').forEach(function (t) {
    t.addEventListener('click', function () {
        document.getElementById('searchInput').value = this.textContent.trim();
        document.getElementById('searchInput').focus();
    });
});


$(document).ready(function () {
    $('.magnific_popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        disableOn: 300
    });
});


function filterMenu(cat) {
    // sync filter buttons
    document.querySelectorAll('.filtbtn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-f') === cat);
    });
    // sync category cards
    document.querySelectorAll('.catcard').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === cat);
    });
    // show/hide menu cards
    document.querySelectorAll('.mwrap').forEach(function (w) {
        var c = w.getAttribute('data-c');
        if (cat === 'all' || c === cat) {
            w.classList.remove('gone');
            w.style.opacity = '0';
            w.style.transform = 'translateY(16px)';
            setTimeout(function () {
                w.style.transition = 'opacity .38s,transform .38s';
                w.style.opacity = '1';
                w.style.transform = 'translateY(0)';
            }, 60);
        } else {
            w.classList.add('gone');
        }
    });
}

// Filter buttons
document.querySelectorAll('.filtbtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        filterMenu(this.getAttribute('data-f'));
    });
});

// Category section cards â†’ scroll + filter
document.querySelectorAll('.catcard').forEach(function (card) {
    card.addEventListener('click', function () {
        var f = this.getAttribute('data-filter');
        window.scrollTo({
            top: document.getElementById('menu').offsetTop - 80,
            behavior: 'smooth'
        });
        setTimeout(function () {
            filterMenu(f);
        }, 480);
    });
});


var menuPop = document.getElementById('menuPop');
var mpQty = 1;

function openMenuPop(card) {
    var img = card.getAttribute('data-img');
    var title = card.getAttribute('data-title');
    var cat = card.getAttribute('data-cat');
    var price = card.getAttribute('data-price');
    var old = card.getAttribute('data-old');
    var rating = parseFloat(card.getAttribute('data-rating'));
    var reviews = card.getAttribute('data-reviews');
    var cal = card.getAttribute('data-cal');
    var time = card.getAttribute('data-time');
    var desc = card.getAttribute('data-desc');
    var tags = card.getAttribute('data-tags') || '';

    document.getElementById('mpImg').setAttribute('src', img);
    document.getElementById('mpCat').textContent = cat;
    document.getElementById('mpTitle').textContent = title;

    var full = Math.round(rating),
        empty = 5 - full;
    document.getElementById('mpStars').innerHTML =
        '<i class="fas fa-star"></i>'.repeat(full) + 'â˜†'.repeat(empty) +
        ' <span style="color:#bbb;font-size:.78rem;">' + rating + ' (' + reviews + ' reviews)</span>';

    document.getElementById('mpDesc').textContent = desc;

    document.getElementById('mpPrice').innerHTML =
        price + (old ? '<small style="color:#ccc;text-decoration:line-through;margin-left:8px;font-size:1rem;">' + old + '</small>' : '');

    document.getElementById('mpMeta').innerHTML =
        '<div class="mpm"><div class="mpmv">' + cal + ' </div><div class="mpml">Crafts</div></div>' +
        '<div class="mpm"><div class="mpmv">' + time + ' </div><div class="mpml">Delivery</div></div>' +
        '<div class="mpm"><div class="mpmv">' + rating + '/5</div><div class="mpml">Rating</div></div>';

    document.getElementById('mpTags').innerHTML =
        tags.split(',').filter(Boolean).map(function (t) {
            return '<span class="mptag">' + t.trim() + '</span>';
        }).join('');

    mpQty = 1;
    document.getElementById('mpQnum').textContent = 1;

    const orderBtn = document.getElementById("whatsappOrder");

    if (orderBtn) {
        orderBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Order on WhatsApp';
        orderBtn.style.background = "";
    }
    menuPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Card click open popup
// document.querySelectorAll('.mcard').forEach(function (card) {
//     card.addEventListener('click', function () {
//         openMenuPop(this);
//     });
// });

// + button  open popup (stop propagation to avoid double firing)
// document.querySelectorAll('.madd').forEach(function (btn) {
//     btn.addEventListener('click', function (e) {
//         e.stopPropagation();
//         openMenuPop(this.closest('.mcard'));
//     });
// });

// Heart toggle (no popup)
document.querySelectorAll('.mhrt').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var ico = this.querySelector('i');
        ico.classList.toggle('far');
        ico.classList.toggle('fas');
        this.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
    });
});

// Close popup
document.getElementById('mpClose').addEventListener('click', closeMenuPop);
menuPop.addEventListener('click', function (e) {
    if (e.target === this) closeMenuPop();
});

function closeMenuPop() {
    menuPop.classList.remove('open');
    document.body.style.overflow = '';
}

// Qty +/-
document.getElementById('mpPlus').addEventListener('click', function () {
    document.getElementById('mpQnum').textContent = ++mpQty;
});
document.getElementById('mpMinus').addEventListener('click', function () {
    if (mpQty > 1) document.getElementById('mpQnum').textContent = --mpQty;
});

// Add to cart button
// // WhatsApp Order Button
// document.getElementById("mpAddCart").addEventListener("click", function () {

//     const product = document.getElementById("mpTitle").textContent;

//     const message =
//         `Hello Mahiii Creation! 🌸

// I would like to order:

// 🧶 Product: ${product}

// Please tell me how to proceed. 😊`;

//     window.open(
//         "https://wa.me/918441897087?text=" +
//         encodeURIComponent(message),
//         "_blank"
//     );

// });

document.getElementById("resBtn").addEventListener("click", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const contact = document.getElementById("contact").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !email || !message) {
        alert("Please fill all required fields.");
        return;
    }

    const subject = "New Custom Order Request";

    const body = `🌸 New Custom Order Request

Name: ${name}

Phone: ${phone}

Email: ${email}

Category: ${category}

Required By: ${date}

Preferred Contact: ${contact}

Order Details:

${message}`;

    // ===== Preferred Contact Method =====

    if (contact === "WhatsApp") {

        window.open(
            "https://wa.me/918441897087?text=" +
            encodeURIComponent(body),
            "_blank"
        );

    }

    else if (contact === "Email") {

        window.location.href =
            `mailto:queries.mahiicreation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    }

    else if (contact === "Phone Call") {

        window.location.href = "tel:+918441897087";

    }

    else if (contact === "Instagram") {

        window.open(
            "https://instagram.com/mahiii_creation06",
            "_blank"
        );

    }

    // Success Message
    document.getElementById("resOk").style.display = "block";

    // Reset Form
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("date").value = "";
    document.getElementById("contact").selectedIndex = 0;
    document.getElementById("message").value = "";

});

document.getElementById('ctcBtn').addEventListener('click', function () {
    var btn = this;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(function () {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        var ok = document.getElementById('ctcOk');
        ok.style.display = 'block';
        ok.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 1500);
});





/*  ESC key closes everything */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeMenuPop();

        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});


new Swiper('.tesSwiper', {
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});
/* SPECIAL OFFER*/

const cdH = document.getElementById("cdH");
const cdM = document.getElementById("cdM");
const cdS = document.getElementById("cdS");

if (cdH && cdM && cdS) {

    let cH = 8;
    let cM = 45;
    let cS = 30;

    setInterval(function () {

        cS--;

        if (cS < 0) {
            cS = 59;
            cM--;
        }

        if (cM < 0) {
            cM = 59;
            cH--;
        }

        if (cH < 0) {
            cH = 8;
            cM = 45;
            cS = 30;
        }

        cdH.textContent = String(cH).padStart(2, "0");
        cdM.textContent = String(cM).padStart(2, "0");
        cdS.textContent = String(cS).padStart(2, "0");

    }, 1000);

}

/* â”€â”€ NEWSLETTER â”€â”€ */
/* NEWSLETTER */

const nlBtn = document.getElementById("nlBtn");
const nlEmail = document.getElementById("nlEmail");

if (nlBtn && nlEmail) {

    nlBtn.addEventListener("click", function () {

        const email = nlEmail.value.trim();

        if (email && email.includes("@")) {

            nlBtn.textContent = "✓ Subscribed!";
            nlBtn.style.background = "#4ade80";
            nlBtn.style.color = "#222";

            nlEmail.value = "";

            setTimeout(function () {
                nlBtn.textContent = "Subscribe";
                nlBtn.style.background = "";
                nlBtn.style.color = "";
            }, 3000);

        }

    });

}

/*  NUMBER COUNTER ANIMATION*/
var numAnimated = false;
window.addEventListener('scroll', function () {
    var hero = document.getElementById('hero');
    if (!numAnimated && hero && window.scrollY > hero.offsetHeight - 300) {
        numAnimated = true;
        document.querySelectorAll('.snum').forEach(function (el) {
            var txt = el.textContent;
            var num = parseInt(txt);
            var suf = txt.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            var start = 0;
            var step = Math.ceil(num / 55);
            var iv = setInterval(function () {
                start += step;
                if (start >= num) {
                    start = num;
                    clearInterval(iv);
                }
                el.textContent = start + suf;
            }, 1400 / 55);
        });
    }
});
// const whatsappBtn = document.getElementById("whatsappOrder");

// if (whatsappBtn) {

//     whatsappBtn.addEventListener("click", function (e) {

//         e.preventDefault();
//         e.stopPropagation();

//         const product = document.getElementById("mpTitle").textContent;
//         const price = document.getElementById("mpPrice").childNodes[0].textContent.trim();
//         const qty = document.getElementById("mpQnum").textContent;
//         const note = document.getElementById("customNote").value.trim();

//         const image =
//             "https://mahiii-creation.netlify.app/" +
//             document.getElementById("mpImg").getAttribute("src");

//         let message =
//             `🌸 Hello Mahiii Creation!

// I would like to order this handmade product.

// 🧶 Product: ${product}
// 💰 Price: ${price}
// 📦 Quantity: ${qty}`;

//         if (note !== "") {
//             message += `

// 🎁 Customization: ${note}`;
//         }

//         message += `

// 🖼️ Product Image:
// ${image}

// Please guide me further.

// Thank you! 💜`;

//         window.open(
//             "https://wa.me/918441897087?text=" + encodeURIComponent(message),
//             "_blank"
//         );

//     });

// }

document.addEventListener("click", function (e) {

    if (e.target.closest("#whatsappOrder")) {

        e.preventDefault();

        const product = document.getElementById("mpTitle").innerText;
        const price = document.getElementById("mpPrice").childNodes[0].textContent.trim();
        const qty = document.getElementById("mpQnum").innerText;

        const noteBox = document.getElementById("customNote");
        const note = noteBox ? noteBox.value.trim() : "";

        const shipping = 80;

        const total =
            Number(price.replace(/[^\d]/g, "")) * Number(qty) + shipping;

        const message = `🌸 Hello Mahiii Creation!

I would like to order this handmade product.

━━━━━━━━━━━━━━━━━━
🛍️ PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━

📦 Product:
${product}

💰 Price:
${price}

🔢 Quantity:
${qty}

🎨 Customization:
${note || "None"}

━━━━━━━━━━━━━━━━━━
🚚 SHIPPING
━━━━━━━━━━━━━━━━━━

Shipping (India): ₹80

International Shipping:
Calculated separately after confirmation.

━━━━━━━━━━━━━━━━━━
💜 TOTAL
━━━━━━━━━━━━━━━━━━

₹${total}

Thank you ❤️`;

        window.open(
            "https://wa.me/918441897087?text=" + encodeURIComponent(message),
            "_blank"
        );

    }

});
window.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");

    if (!input || !results || typeof products === "undefined") return;

    input.addEventListener("keyup", function () {

        const keyword = input.value.trim().toLowerCase();

        results.innerHTML = "";

        if (keyword === "") {
            results.style.display = "none";
            return;
        }

        const matched = products.filter(p =>
            p.name.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword)
        );

        if (matched.length === 0) {
            results.style.display = "block";
            results.innerHTML =
                "<div class='search-item'>No products found.</div>";
            return;
        }

        results.style.display = "block";

        matched.forEach(product => {

            results.innerHTML += `
                <div class="search-item" onclick="location.href='product.html?id=${product.id}'">
                    <img src="${product.image}">
                    <div>
                        <strong>${product.name}</strong><br>
                        ₹${product.price}
                    </div>
                </div>
            `;

        });

    });

});

// new Swiper(".popularSwiper", {

//     loop: true,

//     slidesPerView: 1,

//     centeredSlides: true,

//     spaceBetween: 30,

//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },

//     pagination: {
//         el: ".popularSwiper .swiper-pagination",
//         clickable: true,
//     },

//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     }

// });

function orderPopularProduct(name, price, description) {

    const shippingIndia = 80;

    const message = `🌸 Hello Mahiii Creation!

I would like to order this product.

━━━━━━━━━━━━━━━━━━
🛍️ PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━

📦 Product :
${name}

💰 Price :
₹${price}

📝 Description :
${description}

━━━━━━━━━━━━━━━━━━
📱 ORDER DETAILS
━━━━━━━━━━━━━━━━━━

📱 Phone Model (If Applicable) :
_____________________

🔢 Quantity :
1

🎨 Customization :
_____________________

━━━━━━━━━━━━━━━━━━
💳 PRICE SUMMARY
━━━━━━━━━━━━━━━━━━

Product Price :
₹${price}

Delivery Charges (India) :
₹${shippingIndia}

International Shipping :
Calculated separately according to destination country.

━━━━━━━━━━━━━━━━━━
💜 TOTAL
━━━━━━━━━━━━━━━━━━

₹${price + shippingIndia}

Thank you ❤️
I look forward to your confirmation.`;

    window.open(
        `https://wa.me/918441897087?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}

