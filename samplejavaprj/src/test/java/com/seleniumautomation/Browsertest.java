package com.seleniumautomation;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class Browsertest {
	
	@Test
	public void test1() {
		
		//System.setProperty("webdriver.gecko.driver","C:\\geckodriver.exe");
		//WebDriver driver = new FirefoxDriver();
		//comment the above 2 lines and uncomment below 2 lines to use Chrome
		System.setProperty("webdriver.chrome.driver","C:\\chromedriver\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
    	
        String baseUrl = "http://google.com";

        // launch Fire fox and direct it to the Base URL
        driver.get(baseUrl);

        // get the actual value of the title
        String actualTitle = driver.getTitle();

        /*
         * compare the actual title of the page with the expected one and print
         * the result as "Passed" or "Failed"
         */
       
    
            System.out.println("Page Title:::::::::"+actualTitle);
       
       
        //close Fire fox priyanka
        driver.close();
       
	}

}
