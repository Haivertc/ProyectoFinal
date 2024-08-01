package co.edu.uptc.management.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import co.edu.uptc.management.constants.CommonConstants;
import co.edu.uptc.management.liqour.dto.SaleDTO;

public class ManagementPersistenceSale extends FilePlain {

    private List<SaleDTO> listSalesDTO = new ArrayList<>();

    public void dumpFilePlain(String rutaArchivo) {
        List<String> records = new ArrayList<>();
        for (SaleDTO saleDTO : listSalesDTO) {
            StringBuilder contentSale = new StringBuilder();
            contentSale.append(saleDTO.getSaleDate()).append(CommonConstants.SEMI_COLON);
            contentSale.append(saleDTO.getQuantitySold()).append(CommonConstants.SEMI_COLON);
            contentSale.append(saleDTO.getUnitPrice()).append(CommonConstants.SEMI_COLON);
            contentSale.append(saleDTO.getCustomerName()).append(CommonConstants.SEMI_COLON);
            contentSale.append(saleDTO.getLiqourName());
            records.add(contentSale.toString());
        }
        this.writer(rutaArchivo, records);
    }

    public void loadFilePlain(String rutaNombreArchivo) {
        List<String> contentInLine = this.reader(rutaNombreArchivo);
        for (String row : contentInLine) {
            StringTokenizer tokens = new StringTokenizer(row, CommonConstants.SEMI_COLON);
            while (tokens.hasMoreElements()) {
                String saleDate = tokens.nextToken();
                int quantitySold = Integer.parseInt(tokens.nextToken());
                double unitPrice = Double.parseDouble(tokens.nextToken());
                String customerName = tokens.nextToken();
                String liqourName = tokens.nextToken();
                listSalesDTO.add(new SaleDTO(saleDate, quantitySold, unitPrice, customerName, liqourName));
            }
        }
    }

    public List<SaleDTO> getListSalesDTO() {
        return listSalesDTO;
    }

    public void setListSalesDTO(List<SaleDTO> listSalesDTO) {
        this.listSalesDTO = listSalesDTO;
    }
}