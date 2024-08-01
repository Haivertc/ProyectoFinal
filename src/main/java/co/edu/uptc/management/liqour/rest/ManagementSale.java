package co.edu.uptc.management.liqour.rest;

import java.util.List;
import java.util.Objects;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import co.edu.uptc.management.liqour.dto.SaleDTO;
import co.edu.uptc.management.persistence.ManagementPersistenceSale;

@Path("/ManagementSale")
public class ManagementSale {

    public static ManagementPersistenceSale managementPersistenceSale = new ManagementPersistenceSale();

    static {
        managementPersistenceSale.loadFilePlain("/data/sales.txt");
    }

    @GET
    @Path("/getSales")
    @Produces({ MediaType.APPLICATION_JSON })
    public List<SaleDTO> getSales() {
        return managementPersistenceSale.getListSalesDTO();
    }

    @GET
    @Path("/getSaleByLiqourName")
    @Produces({ MediaType.APPLICATION_JSON })
    public SaleDTO getSaleByLiqourName(@QueryParam("liqourName") String liqourName) {
        for (SaleDTO saleDTO : managementPersistenceSale.getListSalesDTO()) {
            if (saleDTO.getLiqourName().equals(liqourName)) {
                return saleDTO;
            }
        }
        return null;
    }

    @POST
    @Path("/createSale")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public SaleDTO createSale(SaleDTO saleDTO) {
        if (managementPersistenceSale.getListSalesDTO().add(saleDTO)) {
            managementPersistenceSale.dumpFilePlain("/data/sales.txt");
            return saleDTO;
        }
        return null;
    }

    @PUT
    @Path("/updateSale")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public SaleDTO updateSale(SaleDTO saleDTO) {
        for (SaleDTO sale : managementPersistenceSale.getListSalesDTO()) {
            if (sale.getLiqourName().equals(saleDTO.getLiqourName())) {
                sale.setSaleDate(saleDTO.getSaleDate());
                sale.setQuantitySold(saleDTO.getQuantitySold());
                sale.setUnitPrice(saleDTO.getUnitPrice());
                sale.setCustomerName(saleDTO.getCustomerName());
                sale.setLiqourName(saleDTO.getLiqourName());
                managementPersistenceSale.dumpFilePlain("/data/sales.txt");
                return saleDTO;
            }
        }
        return null;
    }

    @PUT
    @Path("/updateSaleAttribute")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public SaleDTO updateSaleAttribute(SaleDTO saleDTO) {
        for (SaleDTO sale : managementPersistenceSale.getListSalesDTO()) {
            if (sale.getLiqourName().equals(saleDTO.getLiqourName())) {
                if (!Objects.isNull(saleDTO.getSaleDate())) {
                    sale.setSaleDate(saleDTO.getSaleDate());
                }

                if (!Objects.isNull(saleDTO.getQuantitySold())) {
                    sale.setQuantitySold(saleDTO.getQuantitySold());
                }

                if (!Objects.isNull(saleDTO.getUnitPrice())) {
                    sale.setUnitPrice(saleDTO.getUnitPrice());
                }

                if (!Objects.isNull(saleDTO.getCustomerName())) {
                    sale.setCustomerName(saleDTO.getCustomerName());
                }

                managementPersistenceSale.dumpFilePlain("/data/sales.txt");
                return saleDTO;
            }
        }
        return null;
    }

    @DELETE
    @Path("/deleteSale")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public SaleDTO deleteSale(@QueryParam("liqourName") String liqourName) {
        SaleDTO saleDTO = this.getSaleByLiqourName(liqourName);
        if (saleDTO != null) {
            managementPersistenceSale.getListSalesDTO().remove(saleDTO);
            managementPersistenceSale.dumpFilePlain("/data/sales.txt");
        }
        return saleDTO;
    }
}
