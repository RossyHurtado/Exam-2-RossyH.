const int pinb2 = 2;
const int pinb1 = 3;
const int pinl1 = 5;
const int pinl2 = 6;
const int pinspin = 0; 


void setup() { 
  
    pinMode(pinb1, INPUT);
    pinMode(pinb2, INPUT);
    pinMode(pinl1, INPUT);
    pinMode(pinl2, INPUT);

    digitalWrite(pinb1, HIGH);
    digitalWrite(pinb2, HIGH);
    digitalWrite(pinl1, HIGH);
    digitalWrite(pinl2, HIGH);

    Serial.begin(9600);
}



void loop() {

sendingData();

}

void sendingData(){
  int spin = analogRead(pinspin);
  int spinMapped = map (spin, 0, 1023, 0,100);

  int bot1 = digitalRead ( pinb1 ); 
  int bot2 = digitalRead ( pinb2 ); 
  int light1 = digitalRead ( pinl1 ); 
  int light2 = digitalRead ( pinl2 ); 

sendSerialData('A',  spinMapped, bot1, bot2, light1, light2);  
  delay(800);

}

void sendSerialData(char keyA, int spinMapped, int bot1,int bot2, int light1, int light2 ) {
Serial.print(keyA);
Serial.print(' ');
Serial.print(spinMapped);
Serial.print(' ');
Serial.print(bot1);
Serial.print(' ');
Serial.print(bot2);
Serial.print(' ');
Serial.print(light1);
Serial.print(' ');
Serial.print(light2);
Serial.println();
}
