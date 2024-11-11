# K6-Loadtesting-tool
k6 is an open-source load testing tool designed for writing and running performance tests, especially targeting applications, APIs, and microservices.

### loadtest1
Single User Behavior: This script simulates a single virtual user that repeatedly makes HTTP requests to the URL with a 1-second pause between each request.

### Loadtest2

**Custom Metric (myTrend)**:
A Trend metric is created to track the response time of each request (res.timings.duration).
This metric is used in the threshold definition (my_trend) to ensure that the average response time is under 300 ms.

**Virtual Users:**
The load test runs in 3 stages:
Stage 1: Ramp up to 20 virtual users over 30 seconds.
Stage 2: Hold steady at 20 virtual users for 1 minute.
Stage 3: Ramp down to 0 virtual users over 10 seconds.

**Thresholds:**
http_req_duration:Ensures that 85% of HTTP requests take less than 500ms.
my_trend: Ensures that the average response time tracked by my_trend is less than 300ms.

**HTTP Request:**
The test sends an HTTP GET request to https://test.k6.io and checks if the response status is 200 (status is 200).
The response time (res.timings.duration) is recorded and added to myTrend.
