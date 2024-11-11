import http from 'k6/http';
import { sleep } from 'k6';

// This script performs an HTTP GET request to https://test.k6.io and then pauses for 1 second before repeating the process.

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
