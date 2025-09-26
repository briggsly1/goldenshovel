document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for homepage
    const priceData = document.getElementById('price-data');
    if (priceData) {
        priceData.innerHTML = 'Loading live prices...';
    }

    // GoldAPI fetch
    fetch('https://www.goldapi.io/api/XAU/USD,CAD,AUD', {
        headers: {
            'x-access-token': goldapi-2icsmg10ts6c-io // Replace with your GoldAPI key
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.prices) {
            const usdPrice = data.prices['USD'].price.toFixed(2);
            const cadPrice = data.prices['CAD'].price.toFixed(2);
            const audPrice = data.prices['AUD'].price.toFixed(2);
            const usdGram = (usdPrice / 31.1035).toFixed(2); // Convert oz to gram
            const cadGram = (cadPrice / 31.1035).toFixed(2);
            const audGram = (audPrice / 31.1035).toFixed(2);

            // Update homepage
            if (priceData) {
                priceData.innerHTML = `
                    <strong>
                        USD: $${usdPrice}/oz ($${usdGram}/g)<br>
                        CAD: $${cadPrice}/oz ($${cadGram}/g)<br>
                        AUD: $${audPrice}/oz ($${audGram}/g)
                    </strong>
                `;
            }

            // Update mining teaser (unchanged)
            const miningTeaser = document.querySelector('#mining-teaser p');
            if (miningTeaser) {
                miningTeaser.innerHTML = 'Sep 26: Canada One Mining advances Copper Dome fieldwork. <a href="/mining.html">Read more</a> (Placeholder)';
            }

            // Update prices page (if on prices.html)
            const pricesPageData = document.getElementById('price-data');
            if (pricesPageData && window.location.pathname.includes('prices.html')) {
                pricesPageData.innerHTML = `
                    <strong>
                        USD: $${usdPrice}/oz ($${usdGram}/g)<br>
                        CAD: $${cadPrice}/oz ($${cadGram}/g)<br>
                        AUD: $${audPrice}/oz ($${audGram}/g)
                    </strong>
                `;
            }
        } else {
            if (priceData) priceData.innerHTML = 'Error loading prices. Try again later.';
        }
    })
    .catch(error => {
        console.error('GoldAPI error:', error);
        if (priceData) priceData.innerHTML = 'Error loading prices. Check API key.';
    });

    // Converter placeholder for prices.html
    window.convert = function() {
        const amount = document.getElementById('amount')?.value || 1;
        document.getElementById('convert-result').innerHTML = `Converted: ~$${amount * 163} CAD/g (Placeholder - Live API soon)`;
    };
});
