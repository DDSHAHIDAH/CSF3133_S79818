const labsContainer = document.getElementById("labsContainer");
const labCount = document.getElementById("labCount");
const errorMessage = document.getElementById("errorMessage");

async function loadLabs() {
    try {
        const response = await fetch("labs.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.labs || !Array.isArray(data.labs)) {
            throw new Error("Invalid labs.json structure.");
        }

        renderLabs(data.labs);
    } catch (error) {
        console.error("Unable to load labs:", error);
        errorMessage.classList.remove("hidden");
    }
}

function renderLabs(labs) {
    labsContainer.innerHTML = "";

    labCount.textContent = `${labs.length} ${labs.length === 1 ? "Lab" : "Labs"}`;

    const sortedLabs = [...labs].sort((a, b) => a.id - b.id);

    sortedLabs.forEach((lab, index) => {
        const labCard = createLabCard(lab, index);
        labsContainer.appendChild(labCard);
    });
}

function createLabCard(lab, index) {
    const card = document.createElement("article");

    card.className = "lab-card";

    const displayNumber = String(lab.id ?? index + 1).padStart(2, "0");

    const links = Array.isArray(lab.links) ? lab.links : [];

    const resourceText = `${links.length} ${links.length === 1 ? "Resource" : "Resources"}`;

    card.innerHTML = `
        <button class="lab-header" type="button" aria-expanded="false">
            <div class="lab-main">
                <div class="lab-number">${displayNumber}</div>
                <div class="lab-info">
                    <span class="lab-title">${escapeHTML(lab.title ?? `Lab ${displayNumber}`)}</span>
                    <span class="lab-description">${escapeHTML(lab.description ?? "")}</span>
                </div>
            </div>

            <div class="lab-meta">
                <span class="resource-count">${resourceText}</span>
                <span class="arrow" aria-hidden="true"></span>
            </div>
        </button>

        <div class="lab-content">
            <div class="lab-content-inner">${createResourceList(links)}</div>
        </div>
    `;

    const header = card.querySelector(".lab-header");

    header.addEventListener("click", () => {
        toggleLab(card, header);
    });

    return card;
}

function createResourceList(links) {
    if (!links || links.length === 0) {
        return `
            <div class="empty-lab">No resources have been added to this laboratory yet.</div>
        `;
    }

    const resources = links.map(link => {
        const icon = getResourceIcon(link.type);
        const target = link.target === "_self" ? "_self" : "_blank";

        return `
            <a class="resource-link" href="${escapeAttribute(link.url)}" target="${target}" ${target === "_blank" ? 'rel="noopener noreferrer"' : ""}>
                <div class="resource-info">
                    <span class="resource-icon">${icon}</span>
                    <span class="resource-title">${escapeHTML(link.title ?? "Resource")}</span>
                </div>
                <span class="link-arrow">→</span>
            </a>
        `;
    }).join("");

    return `
        <nav class="resource-list" aria-label="Laboratory Resources">${resources}</nav>
    `;
}

function toggleLab(selectedCard, selectedHeader) {
    const currentlyActive = selectedCard.classList.contains("active");

    document.querySelectorAll(".lab-card").forEach(card => {
        card.classList.remove("active");

        const header = card.querySelector(".lab-header");

        header?.setAttribute("aria-expanded", "false");
    });

    if (!currentlyActive) {
        selectedCard.classList.add("active");
        selectedHeader.setAttribute("aria-expanded", "true");
    }
}

function getResourceIcon(type) {
    switch (type) {
        case "pdf":
            return "PDF";

        case "page":
            return "WEB";

        case "exercise":
            return "EX";

        case "report":
            return "DOC";

        default:
            return "↗";
    }
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
    return escapeHTML(value);
}

loadLabs();