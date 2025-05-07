from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

driver.get("login-URL")

driver.find_element(By.NAME, "email").send_keys("admin@example.com")
driver.find_element(By.NAME, "password").send_keys("password")

driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

driver.quit()
