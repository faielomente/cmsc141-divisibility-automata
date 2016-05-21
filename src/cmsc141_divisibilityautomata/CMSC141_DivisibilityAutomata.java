/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import cmsc141_divisibilityautomata.TransitionTable;
import java.util.Enumeration;
import java.util.Hashtable;

/**
 *
 * @author parfait
 */
public class CMSC141_DivisibilityAutomata {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Hashtable multiples = new Hashtable();
        for(int i = 2; i < 10; i++){
            TransitionTable tTable = new TransitionTable(i);
            tTable.populateTable();
            
            int[][] arrayTable = tTable.transistion;
            System.out.println("Numeber: " + i);
            for(int state = 0; state<i; state++){
                for (int remainder = 0; remainder < i; remainder++){
                    System.out.print(arrayTable[state][remainder] + " | ");
                }
                System.out.println("\n");
            }
            multiples.put(i, new TransitionTable(i));
        }        
        Enumeration divisor;
        divisor = multiples.keys();
        while(divisor.hasMoreElements()) {
            int num = (int) divisor.nextElement();
            System.out.println(num + ": " +
            tTable = (TransitionTable) multiples.get(num);
      }
    }
    
}