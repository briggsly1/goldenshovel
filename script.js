document.addEventListener('DOMContentLoaded', () => {
    const priceData = document.getElementById('price-data');
    const miningTeaser = document.querySelector('#mining-teaser p');
    const apiKey = 'goldapi-2icsmg10ts6c-io'; // Replace with your actual GoldAPI key

    if (miningTeaser) {
        miningTeaser.innerHTML = 'Sep 26: Canada One Mining advances Copper Dome fieldwork. <a href="/mining.html">Read more</a> (Placeholder)';
    }

    if (priceData) {
        priceData.innerHTML = 'Loading live prices...';
    }

    // Function to fetch price for a currency
    function fetchPrice(currency) {
        return fetch(`https://www.goldapi.io/api/XAU/${currency}`, {
            headers: { 'x-access-token': apiKey }
        }).then(response => response.json());
    }

    // Fetch prices for USD, CAD, AUD
    Promise.all([fetchPrice('USD'), fetchPrice('CAD'), fetchPrice('AUD')])
        .then(([usdData, cadData, audData]) => {
            const usdPrice = usdData.price ? usdData.price.toFixed(2) : 'N/A';
            const cadPrice = cadData.price ? cadData.price.toFixed(2) : 'N/A';
            const audPrice = audData.price ? audData.price.toFixed(2) : 'N/A';

            const usdGram = usdPrice !== 'N/A' ? (usdPrice / 31.1035).toFixed(2) : 'N/A';
            const cadGram = cadPrice !== 'N/A' ? (cadPrice / 31.1035).toFixed(2) : 'N/A';
            const audGram = audPrice !== 'N/A' ? (audPrice / 31.1035).toFixed(2) : 'N/A';

            if (priceData) {
                priceData.innerHTML = `
                    <strong>
                        USD: $${usdPrice}/oz ($${usdGram}/g)<br>
                        CAD: $${cadPrice}/oz ($${cadGram}/g)<br>
                        AUD: $${audPrice}/oz ($${audGram}/g)
                    </strong>
                    <p style="font-size: 0.8em; color: gray;">Updated: ${new Date().toLocaleTimeString()}</p>
                `;
            }
        })
        .catch(error => {
            console.error('GoldAPI error:', error);
            if (priceData) {
                priceData.innerHTML = '<p style="color: red;">Error loading prices. Check console (F12).</p>';
            }
        });

    // Converter for prices.html
    window.convert = function() {
        const amount = document.getElementById('amount')?.value || 1;
        document.getElementById('convert-result').innerHTML = `Converted ${amount} oz: ~$${amount * 163} CAD (Placeholder)`;
    };
});
