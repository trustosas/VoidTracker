// ==UserScript==
// @name        TradingView Market Replay
// @namespace   Violentmonkey Scripts
// @version     0.1
// @description Add market replay functionality to TradingView charts
// @author      You
// @match       https://webtrading2.forex.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    // Wait for iframe to load and access TradingView
    function waitForIframe() {
        const iframe = document.querySelector('iframe');
        if (!iframe) {
            setTimeout(waitForIframe, 1000);
            return;
        }

        // Initialize replay functionality
        initReplay(iframe);
    }

    function initReplay(iframe) {
        // Add replay button to top toolbar
        const replayButton = createReplayButton();
        const toolbarRight = iframe.contentDocument.querySelector('.group-wWM3zP_M-');
        if (toolbarRight) {
            toolbarRight.insertBefore(replayButton, toolbarRight.firstChild);
        }

        // Create control bar container
        const controlBar = createControlBar();

        // Find the chart container and insert the control bar above the bottom toolbar
        const chartContainer = iframe.contentDocument.querySelector('.chart-container');
        if (chartContainer) {
            chartContainer.appendChild(controlBar);
        }

        // Initialize replay state
        let isReplaying = false;
        let replaySpeed = 1;
        let currentBarIndex = 0;

        // Add event listeners
        replayButton.addEventListener('click', () => {
            isReplaying = !isReplaying;
            controlBar.style.display = isReplaying ? 'flex' : 'none';
            replayButton.classList.toggle('active');

            if (isReplaying) {
                initializeReplayMode(iframe);
            } else {
                exitReplayMode(iframe);
            }
        });
    }

    function createReplayButton() {
        const button = document.createElement('div');
        button.className = 'button-1VVj8kLG- button-2DZWQz7P-';
        button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="currentColor" d="M3 2v14l12-7z"/>
            </svg>
        `;
        button.title = 'Market Replay';
        return button;
    }

    function createControlBar() {
        const bar = document.createElement('div');
        bar.style.cssText = `
            position: absolute;
            bottom: 88px; /* Position above both bottom toolbars (40px + 48px) */
            left: 0;
            right: 0;
            height: 48px;
            background: #ffffff;
            display: none;
            align-items: center;
            justify-content: center;
            gap: 20px;
            border-top: 1px solid #e0e3eb;
            z-index: 999;
        `;

        // Create a container for the replay controls
        const controlsContainer = document.createElement('div');
        controlsContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        // Add go to start button
        const goToStartBtn = document.createElement('button');
        goToStartBtn.innerHTML = '⏮';
        goToStartBtn.className = 'replay-control';

        // Add play/pause button
        const playPauseBtn = document.createElement('button');
        playPauseBtn.innerHTML = '⏵';
        playPauseBtn.className = 'replay-control';

        // Add next bar button
        const nextBarBtn = document.createElement('button');
        nextBarBtn.innerHTML = '⏭';
        nextBarBtn.className = 'replay-control';

        // Add speed control
        const speedSelect = document.createElement('select');
        speedSelect.className = 'replay-control';
        [1, 2, 3, 5, 10].forEach(speed => {
            const option = document.createElement('option');
            option.value = speed;
            option.text = `${speed}x`;
            speedSelect.appendChild(option);
        });

        // Add date range display
        const dateRange = document.createElement('div');
        dateRange.className = 'replay-date-range';
        dateRange.textContent = 'Date Range';
        dateRange.style.color = '#b2b5be';

        // Add styles for controls
        const style = document.createElement('style');
        style.textContent = `
            .replay-control {
                background: none;
                border: 1px solid #e0e3eb;
                color: #131722;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                min-width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .replay-control:hover {
                background: #f0f3fa;
            }
            .replay-control select {
                background: none;
                border: none;
                color: inherit;
                padding: 0 5px;
            }
            .replay-date-range {
                margin-left: 16px;
                font-size: 14px;
            }
        `;

        controlsContainer.appendChild(goToStartBtn);
        controlsContainer.appendChild(playPauseBtn);
        controlsContainer.appendChild(nextBarBtn);
        controlsContainer.appendChild(speedSelect);
        controlsContainer.appendChild(dateRange);

        bar.appendChild(style);
        bar.appendChild(controlsContainer);

        return bar;
    }

    function initializeReplayMode(iframe) {
        // TODO: Implement hiding future bars
        // This will require accessing the chart instance and manipulating the data
        console.log('Initializing replay mode');
    }

    function exitReplayMode(iframe) {
        // TODO: Restore normal chart view
        console.log('Exiting replay mode');
    }

    // Start initialization
    waitForIframe();
})();