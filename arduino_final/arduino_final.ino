#include <Wire.h>
#include <WiFiManager.h>               //we are using the ESP32
#include <Firebase_ESP_Client.h>
#include <Adafruit_GFX.h> 
#include <Adafruit_SSD1306.h> 
#define OLED_RESET 4 

Adafruit_SSD1306 display(OLED_RESET); 

#define SensorPin 14
#define SensorPin2 26
#define SensorPin3 33

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "DESKTOP-OKUONEF 4918"
#define WIFI_PASSWORD "SS@17145589"
#define wifi_timeout_ms 20000

// Insert Firebase project API Key
#define API_KEY "AIzaSyB5pn8-YpeZn14oCz7Ykubyujw6IS-uU9Q"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://smart-parking-88ddf-default-rtdb.asia-southeast1.firebasedatabase.app/" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;                    

void connect(){
   Serial.print("connecting..") ;
   WiFi.mode(WIFI_STA) ;
   WiFi.begin(WIFI_SSID ,WIFI_PASSWORD) ;

   unsigned long startTime = millis() ;

   while(WiFi.status() != WL_CONNECTED && millis() - startTime < wifi_timeout_ms) {
     Serial.print(".") ;
     delay(100) ;
   }

   if(WiFi.status() !=WL_CONNECTED) {
     Serial.println("failed") ;
   }else{
     Serial.println("connected") ;
     Serial.println(WiFi.localIP()) ;
   }
 }
void setup(){
  pinMode(SensorPin, INPUT);
   pinMode(SensorPin2, INPUT);
   pinMode(SensorPin3, INPUT);
  connect() ;


  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.begin(9600) ;


  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); 
  display.clearDisplay(); 
  display.setTextColor(WHITE); 
  display.setTextSize(1); 

}

void loop(){
  display.clearDisplay(); // clear the display before starting sensor readings and message printing
  int SensorValue = digitalRead(SensorPin);
  int SensorValue2 = digitalRead(SensorPin2);
  int SensorValue3 = digitalRead(SensorPin3);


  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)){
    //since we want the data to be updated every second
    sendDataPrevMillis = millis();
    // Enter Temperature in to the DHT_11 Table
    if (Firebase.RTDB.setInt(&fbdo, "slots/int" ,SensorValue)){
  display.setCursor(0,0);

      // This command will be executed even if you dont serial print but we will make sure its working
      if(SensorValue==LOW){
      Serial.print("status1 : ");
      Serial.println("detected");
      display.print("Slot 1: occupied");

       }
      else if(SensorValue==HIGH){
      Serial.print("status1 : ");
      Serial.println("empty");
      display.print("Slot 1: unoccupied");

      }
    }
    if (Firebase.RTDB.setInt(&fbdo, "slots/int2" ,SensorValue2)){
      // This command will be executed even if you dont serial print but we will make sure its working
  display.setCursor(0,10);

      if(SensorValue2==LOW){
      Serial.println("status2 : ");
      Serial.println("detected");
      display.print("Slot 2: occupied");
       }
      else if(SensorValue2==HIGH){
      Serial.println("status2 : ");
      Serial.println("empty");
      display.print("Slot 2: unoccupied");
      }
    }
    if (Firebase.RTDB.setInt(&fbdo, "slots/int3" ,SensorValue3)){
      // This command will be executed even if you dont serial print but we will make sure its working
 display.setCursor(0,20);

      if(SensorValue3==LOW){
      Serial.println("status3 : ");
      Serial.println("detected");
    display.print("Slot 3: occupied"); 

       }
      else if(SensorValue3==HIGH){
      Serial.println("status3 : ");
      Serial.println("empty");
    display.print("Slot 3: unoccupied"); 

      }
    }

else {
      Serial.println("Failed to Read from the Sensor");}
      // Serial.println("REASON: " + fbdo.errorReason());}
    } 
 display.display(); // display the entire buffer
  delay(50); // add a delay to avoid flickering
    

}