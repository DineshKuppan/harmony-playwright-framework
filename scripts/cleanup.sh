#!/bin/bash
LOGS_DIR="logs"
HTML_REPORT_DIR="html-report"
ALLURE_RESULTS_DIR="allure-results"
TEST_RESULTS_DIR="test-results"
echo "Cleaning up the HTML report directory"
rm -rf $HTML_REPORT_DIR
echo "Cleaning up the Allure results directory"
rm -rf $ALLURE_RESULTS_DIR
echo "Cleaning up the test results directory"
rm -rf $TEST_RESULTS_DIR
echo "Cleaning up the logs directory"
rm -rf $LOGS_DIR