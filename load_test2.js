// Using a custom metric (myTrend) to track the response time of each request and sets thresholds for performance goals.

import { Trend } from 'k6/metrics';
import http from 'k6/http';
import { check, sleep } from 'k6';

let myTrend = new Trend('my_trend');

// simulates traffic, with virtual users ramping up to 20, holding steady, and then ramping down.

export let options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        'http_req_duration': ['p(85)<500'], 
        'my_trend': ['avg<300'],
    },
    // Output to Prometheus (exposing the metrics on localhost:6565)
    // ext: {
    //     prometheus: {
    //         // Port where Prometheus will scrape
    //         push: 'http://localhost:6565',
    //     },
    // },
};

export default function () {
    let res = http.get('https://test.k6.io');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    myTrend.add(res.timings.duration);
    sleep(1);
}