package co.edu.uptc.management.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import co.edu.uptc.management.constants.CommonConstants;
import co.edu.uptc.management.liqour.dto.LiqourDTO;

public class ManagementPersistenceLiqour extends FilePlain {

	private List<LiqourDTO> listLiqoursDTO = new ArrayList<>();

    public void dumpFilePlain(String rutaArchivo) {
        List<String> records = new ArrayList<>();
        for (LiqourDTO liqourDTO : listLiqoursDTO) {
            StringBuilder contentLiqour = new StringBuilder();
            contentLiqour.append(liqourDTO.getName()).append(CommonConstants.SEMI_COLON);
            contentLiqour.append(liqourDTO.getType()).append(CommonConstants.SEMI_COLON);
            contentLiqour.append(liqourDTO.getBrand()).append(CommonConstants.SEMI_COLON);
            contentLiqour.append(liqourDTO.getAlcoholContent()).append(CommonConstants.SEMI_COLON);
            contentLiqour.append(liqourDTO.getCountryOfOrigin());
            records.add(contentLiqour.toString());
        }
        this.writer(rutaArchivo, records);
    }

    public void loadFilePlain(String rutaNombreArchivo) {
        List<String> contentInLine = this.reader(rutaNombreArchivo);
        for (String row : contentInLine) {
            StringTokenizer tokens = new StringTokenizer(row, CommonConstants.SEMI_COLON);
            while (tokens.hasMoreElements()) {
                String name = tokens.nextToken();
                String type = tokens.nextToken();
                String brand = tokens.nextToken();
                double alcoholContent = Double.parseDouble(tokens.nextToken());
                String countryOfOrigin = tokens.nextToken();
                listLiqoursDTO.add(new LiqourDTO(name, type, brand, alcoholContent, countryOfOrigin));
            }
        }
    }

    public List<LiqourDTO> getListLiqoursDTO() {
        return listLiqoursDTO;
    }

    public void setListLiqoursDTO(List<LiqourDTO> listLiqoursDTO) {
        this.listLiqoursDTO = listLiqoursDTO;
    }
}
