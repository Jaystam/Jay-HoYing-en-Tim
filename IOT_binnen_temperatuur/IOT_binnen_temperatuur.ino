#include "DHT.h"
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

#define DHTTYPE DHT11       // DHT 11 sensor
uint8_t DHTPin = D7;        // DHT Sensor data input
DHT dht(DHTPin, DHTTYPE);   // Initialize DHT sensor.
float Temperature;          // temperature
float Humidity;             // humidity
float HeatIndex;            // Heatindex
float temperature_kelvin;
int LDR_In = A0;
uint8_t Led1 = D3;
uint8_t Led2 = D5;
uint8_t Led3 = D6;
int Light;
bool led1status = false;
bool led2status = false;
bool led3status = false;

// WiFi
const char* ssid = "MediaLab";
const char* password = "Mediacollege";

// POST
String serverProtocol = "https://";
String serverIP = "35671.hosts2.ma-cloud.nl"; // Ma cloud url or localhost IP
String serverDirectory = "Dashboard/post.php"; // path naar directory, bijvoorbeeld: "duurzaamhuis/post.php" 
String URL = ""; // URL om data naar te versturen, wordt automatisch aangemaakt.
const uint8_t fingerprint[20] = {0x1A, 0x48, 0xE9, 0x83, 0x9D, 0x49, 0x82, 0x92, 0xB1, 0xEC, 0x18, 0xCE, 0xBF, 0x5F, 0xFA, 0x54, 0xD8, 0x93, 0xFD, 0xA5}; // fingerprint van jou server

// JSON
const int capacity = JSON_OBJECT_SIZE(7);
StaticJsonDocument<capacity> doc;
char jsonOut[256];

void wifiConnect(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("Connecting...");
  }
  Serial.print("\r\nConnected: SSID: "); 
  Serial.print(ssid);
  Serial.print("    IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("HTTP server started");
  Serial.println("\nSending POST data to: " + URL + "\n");
}

void readDHT11(){
  float temperature =  round(dht.readTemperature()*10)/10; // Gets the values of the temperature
  float humidity = round(dht.readHumidity()*10)/10; // Gets the values of the humidity
  temperature_kelvin = temperature + 273;
  float heatindex = round(dht.computeHeatIndex( Temperature, Humidity, false)*10)/10;
  Light = analogRead(LDR_In); 
        
  if(isnan(temperature) || isnan(humidity) || isnan(heatindex) || isnan(temperature_kelvin)){
    Serial.println("DHT11 sensor error");
  }
  else{
    // the DHT11 readings look ok 
    Temperature = temperature;
    Humidity =  humidity ;
    HeatIndex = heatindex;
    // show in Serial Monitor
    Serial.print("Temp. ");
    Serial.println(Temperature);
    Serial.print("C. Humidity  ");
    Serial.println(humidity);
    Serial.print("% Heatindex ");
    Serial.println(heatindex);
    Serial.println(Light);
    Serial.println(temperature_kelvin);
  }
}

void setLedStatus()
{
  led1status = digitalRead(Led1);
  led2status = digitalRead(Led2);
  led3status = digitalRead(Led3);
}

void generateJson(){
  setLedStatus();
  doc["Temperature"] = Temperature;
  doc["Humidity"] = Humidity;
  doc["HeatIndex"] = HeatIndex;
  doc["Led1"] = led1status;
  doc["Led2"] = led2status;
  doc["Led3"] = led3status;
  doc["Licht"] = Light;
  serializeJson(doc, jsonOut);
}

void SendPOST() {
  //WiFiClient client;
  WiFiClientSecure client;
  client.setFingerprint(fingerprint);
  HTTPClient https;
  
  if( https.begin(client, URL) ){
    https.addHeader("Content-Type", "application/json");
    int responseCode = https.POST(jsonOut);
    String responseMsg = https.getString();
    Serial.print("[HTTPS] POST code: ");
    Serial.print(responseCode);
    Serial.print("\n[HTTPS] Response: ");
    Serial.println(responseMsg);
    https.end();
  }
  else
  {
    Serial.println("[HTTPS] Unable to connect");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(Led1, OUTPUT);
  pinMode(Led2, OUTPUT);
  pinMode(Led3, OUTPUT);
  digitalWrite(Led1, HIGH);

  // Maak de POST url op basis van protocol, serverIP & directory
  if(serverProtocol.length() > 0) URL += serverProtocol;
  URL += serverIP;
  if(serverDirectory.length() > 0) URL += "/" + serverDirectory;
}

void loop() {
  if(WiFi.status() != WL_CONNECTED) wifiConnect();
  readDHT11();
  delay(7500);
  generateJson();
  Serial.println(jsonOut);
  delay(7500);
  SendPOST();
  delay(7500);
}
