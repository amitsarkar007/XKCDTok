class XKCDTok {
    constructor() {
        this.container = document.getElementById('comic-container');
        this.loadingElement = document.getElementById('loading');
        this.currentMaxComic = 0;
        this.loadedComics = new Set();
        this.isLoading = false;
        this.proxyUrl = 'https://api.allorigins.win/raw?url=';
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.setupAboutModal();
        this.init();
    }

    setupAboutModal() {
        const aboutButton = document.getElementById('about-button');
        const aboutModal = document.getElementById('about-modal');
        const closeButton = document.getElementById('close-about');

        aboutButton.addEventListener('click', () => {
            aboutModal.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            aboutModal.classList.remove('active');
        });

        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
            }
        });
    }

    async init() {
        try {
            const response = await fetch(this.proxyUrl + encodeURIComponent('https://xkcd.com/info.0.json'));
            const data = await response.json();
            this.currentMaxComic = data.num;
            
            await this.loadMoreComics(5);
            this.setupInfiniteScroll();
            this.loadingElement.style.display = 'none';
        } catch (error) {
            console.error('Failed to initialize:', error);
            this.showError('Error loading comics. Please try again.');
        }
    }

    showError(message) {
        this.loadingElement.style.display = 'none';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }

    setupInfiniteScroll() {
        this.container.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = this.container;
            if (scrollHeight - scrollTop - clientHeight < 100) {
                this.loadMoreComics(3);
            }
        });
    }

    async loadMoreComics(count) {
        if (this.isLoading) return;
        this.isLoading = true;

        try {
            for (let i = 0; i < count; i++) {
                const comicNum = this.getRandomComicNumber();
                if (comicNum) {
                    await this.loadComic(comicNum);
                }
            }
        } finally {
            this.isLoading = false;
        }
    }

    getRandomComicNumber() {
        let attempts = 0;
        while (attempts < 10) {
            const num = Math.floor(Math.random() * this.currentMaxComic) + 1;
            if (!this.loadedComics.has(num)) {
                this.loadedComics.add(num);
                return num;
            }
            attempts++;
        }
        return null;
    }

    async loadComic(num) {
        try {
            const response = await fetch(this.proxyUrl + encodeURIComponent(`https://xkcd.com/${num}/info.0.json`));
            const comic = await response.json();
            this.createComicSlide(comic);
        } catch (error) {
            console.error(`Failed to load comic ${num}:`, error);
        }
    }

    createComicSlide(comic) {
        const slide = document.createElement('div');
        slide.className = 'comic-slide';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'comic-image-container';

        const img = document.createElement('img');
        img.src = comic.img;
        img.alt = comic.title;
        img.className = 'comic-image';

        const monthName = this.monthNames[parseInt(comic.month) - 1];
        const info = document.createElement('div');
        info.className = 'comic-info';
        info.innerHTML = `
            <div class="comic-number">#${comic.num}</div>
            <div class="comic-title">${comic.title}</div>
            <div class="comic-date">${monthName} ${comic.day}, ${comic.year}</div>
        `;

        imageContainer.appendChild(img);
        slide.appendChild(imageContainer);
        slide.appendChild(info);
        this.container.appendChild(slide);
    }
}

// Initialize the app
new XKCDTok(); 