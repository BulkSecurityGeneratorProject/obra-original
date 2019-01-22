package br.slobra.aplicacao.service;

import br.slobra.aplicacao.service.dto.GastoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Gasto.
 */
public interface GastoService {

    /**
     * Save a gasto.
     *
     * @param gastoDTO the entity to save
     * @return the persisted entity
     */
    GastoDTO save(GastoDTO gastoDTO);

    /**
     * Get all the gastos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GastoDTO> findAll(Pageable pageable);


    /**
     * Get the "id" gasto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GastoDTO> findOne(Long id);

    /**
     * Delete the "id" gasto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}