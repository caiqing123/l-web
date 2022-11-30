<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title')</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">

    <meta name="theme-color" content="#282828">
    <meta name="msapplication-navbutton-color" content="#282828">

    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <script>
        // Work around for "global is not defined" error with local-storage.js
        window.global = window
    </script>
</head>
<body>
<div id="app">
    <style>
        html,
        body,
        #app {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            background-color: #ffffff;
        }
        .first-loading-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        .first-loading-wrap > h1 {
            font-size: 128px;
        }
        .first-loading-wrap .loading-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 98px;
        }
        .dot {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            width: 32px;
            height: 32px;
            font-size: 32px;
            transform: rotate(45deg);
            animation: ant-rotate 1.2s infinite linear;
        }
        .dot i {
            position: absolute;
            display: block;
            width: 14px;
            height: 14px;
            background-color: #1890ff;
            border-radius: 100%;
            opacity: 0.3;
            transform: scale(0.75);
            transform-origin: 50% 50%;
            animation: ant-spin-move 1s infinite linear alternate;
        }
        .dot i:nth-child(1) {
            top: 0;
            left: 0;
        }
        .dot i:nth-child(2) {
            top: 0;
            right: 0;
            animation-delay: 0.4s;
        }
        .dot i:nth-child(3) {
            right: 0;
            bottom: 0;
            animation-delay: 0.8s;
        }
        .dot i:nth-child(4) {
            bottom: 0;
            left: 0;
            animation-delay: 1.2s;
        }
        @keyframes ant-rotate {
            to {
                transform: rotate(405deg);
            }
        }
        @keyframes ant-spin-move {
            to {
                opacity: 1;
            }
        }
    </style>
    <div class="first-loading-wrap">
        <div class="loading-wrap">
            <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
        </div>
    </div>
</div>

<noscript>It may sound funny, but Koel requires JavaScript to sing. Please enable it.</noscript>

<script>
    window.BASE_URL = @json(asset(''));
</script>

@stack('scripts')
</body>
</html>
