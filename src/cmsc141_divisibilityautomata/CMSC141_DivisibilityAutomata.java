package cmsc141_divisibilityautomata;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import cmsc141_divisibilityautomata.DFA;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author parfait
 */
public class CMSC141_DivisibilityAutomata {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        HashMap<Integer, DFA> multiples = new HashMap<>();
        //Creates and store transition table
        for(int i = 2; i < 10; i++){
            DFA tTable = new DFA(i);
            tTable.populateTable();
            
            multiples.put(i, tTable);
        }
        //Print the all the values that the HashMap contains
        Set set = multiples.entrySet();
        Iterator i = set.iterator();
//        while(i.hasNext()){
//            Map.Entry me = (Map.Entry) i.next();
//            System.out.print("Number " + me.getKey()+ ":\n");
//            DFA table = (DFA) me.getValue();
//            int[][] arrayTable = table.transistion;
//            for(int state = 0; state<(int) me.getKey(); state++){
//                for (int remainder = 0; remainder < (int)me.getKey(); remainder++){
//                    System.out.print(arrayTable[state][remainder] + " | ");
//                }
//                System.out.println("\n");
//            }
//        }
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        ArrayList<Integer> list = new ArrayList<>();
        while(i.hasNext()){
            Map.Entry me = (Map.Entry) i.next();
            System.out.print("Number " + me.getKey()+ ":\n");
            DFA table = (DFA) me.getValue();
            boolean output = table.processInput(input);
            if(output == true){
                list.add((Integer)me.getKey());
            }
            System.out.println(output);
        }
        
        System.out.println("LCM:" + list.toString());
    }
}