import React, { useState } from 'react';
import axios from 'axios';
import api from '../helpers/axios';

// Tipagem para o relatório de uso
interface UsageRecord {
  activity: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  assinatura: string;
}

interface UsageReportData {
  equipmentId: string;
  totalRecords: number;
  totalHours: number;
  records: UsageRecord[];
}

const UsageReportPage: React.FC = () => {
  const [equipmentId, setEquipmentId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [report, setReport] = useState<UsageReportData | null>(null);
  const [error, setError] = useState<string>('');

  // Função para buscar o relatório de uso
  const fetchReport = async () => {
    if (!equipmentId) {
      setError('Por favor, insira o ID do equipamento.');
      return;
    }
   
    try {
      const response = await api.get(`/usage/reports${equipmentId}`, {
        params: {
          startDate,
          endDate
        }
      });
      setReport(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao buscar o relatório. Verifique o ID do equipamento e tente novamente.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Relatório de Uso de Equipamento</h2>

      <div>
        <label>
          ID do Equipamento:
          <input 
            type="text" 
            value={equipmentId} 
            onChange={(e) => setEquipmentId(e.target.value)} 
            placeholder="Digite o ID do equipamento"
          />
        </label>
      </div>

      <div>
        <label>
          Data Início:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </label>
      </div>

      <div>
        <label>
          Data Fim:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </label>
      </div>

      <div>
        <button onClick={fetchReport}>Gerar Relatório</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {report && (
        <div style={{ marginTop: '20px' }}>
          <h3>Relatório Gerado</h3>
          <p><strong>ID do Equipamento:</strong> {report.equipmentId}</p>
          <p><strong>Total de Registros:</strong> {report.totalRecords}</p>
          <p><strong>Total de Horas de Uso:</strong> {report.totalHours}</p>

          <h4>Detalhes dos Registros:</h4>
          <ul>
            {report.records.map((record, index) => (
              <li key={index}>
                <strong>Atividade:</strong> {record.activity}<br />
                <strong>Início:</strong> {new Date(record.startTime).toLocaleString()}<br />
                <strong>Fim:</strong> {new Date(record.endTime).toLocaleString()}<br />
                <strong>Horas de Uso:</strong> {record.totalHours}<br />
                <strong>Assinatura:</strong> {record.assinatura}<br />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UsageReportPage;
