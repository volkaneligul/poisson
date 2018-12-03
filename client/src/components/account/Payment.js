import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class Payment extends Component {
  render() {
    const payment = this.props.payment.map(item => (
      <tr key={item._id}>
        <td>{item.paymenttype === '1' ? 'Havale/EFT' : 'Kredi Kartı'}</td>
        <td>{item.selectedleagues[0]}</td>
        <td>{item.selectedpackage + ' Aylık Üyelik Paketi'}</td>
        <td>
          {item.selectedexpert === '0'
            ? 'Yok'
            : item.selectedexpert + ' Aylık Uzman Analiz'}
        </td>
        <td>{item.totalprice}</td>
        <td>
          <Moment format="YYYY/MM/DD">{item.starteddate}</Moment>
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{item.endeddate}</Moment>
        </td>
        <td>
          {item.status === '0'
            ? 'Bekliyor'
            : item.status === '1'
            ? 'Aktif'
            : 'Pasif'}
        </td>
        <td>{item.vipcode}</td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Ödeme Bilgileri</h4>
        <p>
          <strong>Vip kodu</strong>'unuzu Havale/EFT ödemesi için açıklama
          alanında kullanabilirsiniz.
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Ödeme Tipi</th>
              <th>Seçilen Ligler</th>
              <th>Paket Adı</th>
              <th>Uzman Analiz</th>
              <th>Tutar</th>
              <th>Başlangıç Tarihi</th>
              <th>Bitiş Tarihi</th>
              <th>Durumu</th>
              <th>Vip Kodu</th>
              <th />
            </tr>
            {payment}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Payment);
