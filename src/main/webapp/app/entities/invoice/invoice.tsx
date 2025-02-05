import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities } from './invoice.reducer';

export const Invoice = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const invoiceList = useAppSelector(state => state.invoice.entities);
  const loading = useAppSelector(state => state.invoice.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="invoice-heading" data-cy="InvoiceHeading">
        Invoices
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/invoice/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Invoice
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {invoiceList && invoiceList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Invoice Date</th>
                <th>Due Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Branch</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/invoice/${invoice.id}`} color="link" size="sm">
                      {invoice.id}
                    </Button>
                  </td>
                  <td>{invoice.invoiceDate}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.totalAmount}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.branch ? <Link to={`/branch/${invoice.branch.id}`}>{invoice.branch.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/invoice/${invoice.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/invoice/${invoice.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/invoice/${invoice.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Invoices found</div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
