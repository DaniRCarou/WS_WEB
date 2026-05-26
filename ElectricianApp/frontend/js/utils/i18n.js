// =====================================================================
// i18n.js — Internationalization module
// Loads language JSON files and updates all translatable DOM elements
// Supports 7 languages: en, es, de, pt, gl, ca, eus
// =====================================================================

const DEFAULT_LANG = "en";
export let currentLang = DEFAULT_LANG;
export let currentLanguageData = {};

const langLinks = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-i18n]");
const selectedLangContainer = document.querySelector(".selected-lang");

// Loads a language JSON file and updates all texts in the DOM
export async function loadLanguage(lang) {
    try {
        const res = await fetch(`i18n/${lang}.json`);
        const data = await res.json();
        currentLanguageData = data;
        window.currentLanguageData = data;
        updateTexts();
    } catch (err) {
        console.error("Error loading language:", err);
    }
}

// Updates only text nodes inside an element, preserving images and other children
function updateTextNode(el, text) {
    el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE)
            node.textContent = text;
    });
}

// Iterates all data-i18n elements and updates their text content
function updateTexts() {
    textsToChange.forEach(el => {
        const key = el.dataset.i18n;
        const [section, value] = key.split('.');

        if (!currentLanguageData[section] || !currentLanguageData[section][value]) {
            console.warn(`i18n: key not found → ${key}`);
            return;
        }

        const text = currentLanguageData[section][value];

        if ((el.tagName.toLowerCase() === "a" || el.tagName.toLowerCase() === "button") && el.querySelector("img")) {
            updateTextNode(el, " " + text);
        } else if (el.tagName.toLowerCase() === "label" && el.querySelector("input")) {
            updateTextNode(el, " " + text);
        } else if (el.tagName.toLowerCase() === "input") {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });

    const selectedButton = selectedLangContainer.querySelector("button");
    if (selectedButton) {
        const langCode = selectedButton.dataset.language;
        const i18nKey = selectedButton.dataset.i18n;
        const [section, value] = i18nKey.split('.');
        const translatedText = currentLanguageData[section]?.[value] || selectedButton.textContent;
        const imgHTML = selectedButton.querySelector("img")?.outerHTML || "";
        selectedLangContainer.innerHTML = `<button type="button" disabled data-language="${langCode}" data-i18n="${i18nKey}">${imgHTML} ${translatedText}</button>`;
    }
}

// Renders the selected language button and hides it from the dropdown
function renderSelectedLanguage(button) {
    const langCode = button.dataset.language;
    const i18nKey = button.dataset.i18n;
    const [section, value] = i18nKey.split('.');
    const translatedText = currentLanguageData[section]?.[value] || button.textContent;
    const imgHTML = button.querySelector("img")?.outerHTML || "";
    selectedLangContainer.innerHTML = `<button type="button" disabled data-language="${langCode}" data-i18n="${i18nKey}">${imgHTML} ${translatedText}</button>`;
    langLinks.forEach(btn => {
        btn.style.display = btn.dataset.language === langCode ? "none" : "inline-block";
    });
}

// Initializes the language menu on page load
function initLanguageMenu() {
    const defaultButton = document.querySelector(`[data-language="${DEFAULT_LANG}"]`);
    loadLanguage(DEFAULT_LANG).then(() => {
        renderSelectedLanguage(defaultButton);
        document.documentElement.lang = DEFAULT_LANG;
    });

    langLinks.forEach((button) => {
        button.addEventListener("click", () => {
            currentLang = button.dataset.language;
            loadLanguage(button.dataset.language).then(() => {
                renderSelectedLanguage(button);
                document.documentElement.lang = button.dataset.language;
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initLanguageMenu();
});