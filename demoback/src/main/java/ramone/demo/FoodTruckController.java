package ramone.demo;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FoodTruckController {

    List<FoodTrucks> foodTrucks = new ArrayList<FoodTrucks>();
    int count = 0;

    public FoodTruckController (){

        try{
            CSVReader reader=
                    new CSVReaderBuilder(new FileReader("src/main/java/ramone/demo/SanFranFoodTrucks.csv")).
                            withSkipLines(1).
                            build();
                foodTrucks=reader.readAll().stream().map(data-> {
                FoodTrucks csvObject= new FoodTrucks();
                csvObject.setID(count);
                csvObject.setApplicant(data[0]);
                csvObject.setLocationDescription(data[1]);
                csvObject.setAddress(data[2]);
                csvObject.setPhoto(data[3]);
                csvObject.setFoodItems(data[4]);
                csvObject.setLatitude(data[5]);
                csvObject.setLongitude(data[6]);
                csvObject.setSchedule(data[7]);
                csvObject.setLocation(data[8]);
                count++;
                return csvObject;
            }).collect(Collectors.toList());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping("/abcA")
    public List<FoodTrucks> abcATrucks(){
        return foodTrucks.stream().sorted((object1, object2) -> object1.getAddress().compareTo(object2.getAddress())).toList();
    }

    @RequestMapping("/abcN")
    public List<FoodTrucks> abcNTrucks(){
        return foodTrucks.stream().sorted((object1, object2) -> object1.getApplicant().compareTo(object2.getApplicant())).toList();
    }

    @RequestMapping("/all")
    public List<FoodTrucks> allTrucks(){
        return foodTrucks;
    }

    @RequestMapping("/{ID}")
    public FoodTrucks getTruckByID(@PathVariable int ID){
        int index = byID(ID);
        return foodTrucks.get(index);
    }

    @DeleteMapping("/{ID}")
    public FoodTrucks deleteTruckByID(@PathVariable int ID) {
        int index = byID(ID);
        FoodTrucks removedTrucks = foodTrucks.get(index);
        foodTrucks.remove(foodTrucks.get(index));
        return removedTrucks;
        
    }

    @PutMapping("/{ID}")
    public ResponseEntity updateTruckByID(@PathVariable int ID, @RequestBody FoodTrucks truck) {
        int index = byID(ID);
        FoodTrucks updateTrucks = foodTrucks.get(index);
        updateTrucks.setApplicant(truck.getApplicant());
        updateTrucks.setAddress(truck.getAddress());
        updateTrucks.setFoodItems(truck.getFoodItems());

        return ResponseEntity.ok(updateTrucks);
    }

    @PostMapping("/create")
    public String createTruck(@RequestBody FoodTrucks truck) {
        FoodTrucks updateTrucks = new FoodTrucks();
        updateTrucks.setID(count);
        updateTrucks.setApplicant(truck.getApplicant());
        updateTrucks.setAddress(truck.getAddress());
        updateTrucks.setFoodItems(truck.getFoodItems());
        foodTrucks.add(0,updateTrucks);
        ++count;

        return "Success";

    }

    private int byID(int ID){
        int index = 0;
        for (FoodTrucks foodTrucks2 : foodTrucks) {
            
            if(ID == foodTrucks2.getID())
            {
                break;
            }
            index++;
        }
        return index;

    }

}
