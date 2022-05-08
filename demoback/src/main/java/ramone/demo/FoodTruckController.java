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
    Integer count = 0;
    Integer thisCount = -125;

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

    @RequestMapping("/all")
    public List<FoodTrucks> allTrucks(){
        return foodTrucks;
    }

    @RequestMapping("/{ID}")
    public FoodTrucks getTruckByID(@PathVariable Integer ID){
        var index = 0;
        for (FoodTrucks foodTrucks2 : foodTrucks) {
            
            if(ID == foodTrucks2.getID())
            {
                break;
            }
            index++;
        }
        return foodTrucks.get(index);
    }

    @DeleteMapping("/{ID}")
    public FoodTrucks deleteTruckByID(@PathVariable Integer ID) {
        var index = 0;
        for (FoodTrucks foodTrucks2 : foodTrucks) {
            
            if(ID == foodTrucks2.getID())
            {
                break;
            }
            index++;
        }
        FoodTrucks removedTrucks = foodTrucks.get(index);
        foodTrucks.remove(foodTrucks.get(index));
        return removedTrucks;
        
    }

    @PutMapping("/{ID}")
    public ResponseEntity updateTruckByID(@PathVariable Integer ID, @RequestBody FoodTrucks truck) {
        var index = 0;
        for (FoodTrucks foodTrucks2 : foodTrucks) {
            
            if(ID == foodTrucks2.getID())
            {
                break;
            }
            index++;
        }
        FoodTrucks updateTrucks = foodTrucks.get(index);
        updateTrucks.setApplicant(truck.getApplicant());
        updateTrucks.setAddress(truck.getAddress());
        updateTrucks.setFoodItems(truck.getFoodItems());

        return ResponseEntity.ok(updateTrucks);
    }

    @PostMapping("/create")
    public String createTruck(@RequestBody FoodTrucks truck) {
        FoodTrucks updateTrucks = new FoodTrucks();
        updateTrucks.setID(thisCount);
        updateTrucks.setApplicant(truck.getApplicant());
        updateTrucks.setAddress(truck.getAddress());
        updateTrucks.setFoodItems(truck.getFoodItems());
        foodTrucks.add(0,updateTrucks);
        ++thisCount;

        return "Success";

    }

}
