import { useState } from 'react';
import { Search, Download, Eye, Lock, FileText, Book, Bell, FileCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockDocuments } from '../data/mockData';
import { useProfile } from '../context/ProfileContext';
import type { Document } from '../types';
import './Documents.css';

const categoryIcons: Record<string, React.ReactNode> = {
  regulamento: <FileText size={18} />,
  ritual: <Book size={18} />,
  comunicado: <Bell size={18} />,
  ata: <FileCheck size={18} />,
  estatuto: <FileText size={18} />,
};

const categoryLabels: Record<string, string> = {
  regulamento: 'Regulamento',
  ritual: 'Ritual',
  comunicado: 'Comunicado',
  ata: 'Ata',
  estatuto: 'Estatuto',
};

const categoryColors: Record<string, string> = {
  regulamento: '#4298B5',
  ritual: '#6d28d9',
  comunicado: '#d97706',
  ata: '#00C288',
  estatuto: '#0F172A',
};

export default function Documents() {
  const { mode } = useProfile();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  // Simulate user degree based on mode
  const userDegree = mode === 'potencia' ? 33 : mode === 'loja' ? 3 : 1;

  const filtered = mockDocuments.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = activeCategory === 'all' || d.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockDocuments.map(d => d.category)))];

  return (
    <div className="documents-page page-enter">
      {/* Toolbar */}
      <div className="docs-toolbar">
        <div className="docs-search-wrap">
          <Search size={15} className="docs-search-icon" />
          <input
            type="search"
            placeholder="Buscar documentos, rituais, tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="docs-search"
            id="docs-search"
          />
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          {mode !== 'irmao' && (
            <Button variant="accent" size="sm" icon={<Download size={14} />} id="upload-doc-btn">
              + Publicar Documento
            </Button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="docs-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`docs-category-chip ${activeCategory === cat ? 'docs-category-chip--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`doc-category-${cat}`}
            style={activeCategory === cat && cat !== 'all' ? { borderColor: categoryColors[cat], color: categoryColors[cat], background: `${categoryColors[cat]}12` } : {}}
          >
            {cat !== 'all' && <span style={{ color: categoryColors[cat] }}>{categoryIcons[cat]}</span>}
            {cat === 'all' ? 'Todos' : categoryLabels[cat]}
            <span className="docs-category-count">
              {cat === 'all' ? mockDocuments.length : mockDocuments.filter(d => d.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <div className={`docs-content ${previewDoc ? 'docs-content--split' : ''}`}>
        {/* Documents grid */}
        <div className="docs-grid">
          {filtered.map((doc, idx) => {
            const isRestricted = doc.minDegree > userDegree;
            return (
              <div
                key={doc.id}
                className={`doc-card ${isRestricted ? 'doc-card--restricted' : ''}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => !isRestricted && setPreviewDoc(doc.id === previewDoc?.id ? null : doc)}
              >
                {/* Restricted overlay */}
                {isRestricted && (
                  <div className="doc-card__lock-overlay">
                    <Lock size={24} />
                    <div className="doc-card__lock-text">Grau {doc.minDegree}° Necessário</div>
                  </div>
                )}

                <div className="doc-card__header" style={{ filter: isRestricted ? 'blur(2px)' : 'none' }}>
                  <div
                    className="doc-card__icon"
                    style={{
                      background: `${categoryColors[doc.category]}15`,
                      color: categoryColors[doc.category]
                    }}
                  >
                    {categoryIcons[doc.category]}
                  </div>
                  <div className="doc-card__meta">
                    <Badge
                      size="sm"
                      variant={doc.category === 'ritual' ? 'primary' : doc.category === 'comunicado' ? 'warning' : 'muted'}
                    >
                      {categoryLabels[doc.category]}
                    </Badge>
                    {doc.restricted && (
                      <Badge size="sm" variant="danger">Restrito</Badge>
                    )}
                  </div>
                </div>

                <div style={{ filter: isRestricted ? 'blur(3px)' : 'none' }}>
                  <div className="doc-card__title">{doc.title}</div>
                  <div className="doc-card__tags">
                    {doc.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="doc-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="doc-card__footer" style={{ filter: isRestricted ? 'blur(2px)' : 'none' }}>
                  <div className="doc-card__info">
                    <span>{doc.fileSize}</span>
                    <span className="doc-card__sep">·</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {!isRestricted && (
                    <div className="doc-card__actions">
                      <button className="doc-action-btn" title="Visualizar" id={`view-doc-${doc.id}`}>
                        <Eye size={13} />
                      </button>
                      <button className="doc-action-btn" title="Baixar" id={`download-doc-${doc.id}`}>
                        <Download size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Watermark simulation for restricted */}
                {isRestricted && (
                  <div className="doc-card__watermark-pattern">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="doc-watermark-text">CONFIDENCIAL</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="docs-empty">
              <div className="docs-empty__icon">📂</div>
              <div>Nenhum documento encontrado.</div>
            </div>
          )}
        </div>

        {/* Preview panel */}
        {previewDoc && (
          <Card padding="md" className="docs-preview-panel animate-slidein">
            <div className="docs-preview-header">
              <div
                className="docs-preview-icon"
                style={{
                  background: `${categoryColors[previewDoc.category]}15`,
                  color: categoryColors[previewDoc.category]
                }}
              >
                {categoryIcons[previewDoc.category]}
              </div>
              <div>
                <Badge size="sm" variant="muted">{categoryLabels[previewDoc.category]}</Badge>
                <div className="docs-preview-title">{previewDoc.title}</div>
              </div>
              <button className="docs-preview-close" onClick={() => setPreviewDoc(null)}>×</button>
            </div>

            <div className="docs-preview-meta">
              <div className="docs-preview-meta-item">
                <span className="docs-preview-meta-label">Tamanho</span>
                <span>{previewDoc.fileSize}</span>
              </div>
              <div className="docs-preview-meta-item">
                <span className="docs-preview-meta-label">Publicado por</span>
                <span>{previewDoc.uploadedBy}</span>
              </div>
              <div className="docs-preview-meta-item">
                <span className="docs-preview-meta-label">Data</span>
                <span>{new Date(previewDoc.uploadedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="docs-preview-meta-item">
                <span className="docs-preview-meta-label">Grau mínimo</span>
                <span>{previewDoc.minDegree}° Grau</span>
              </div>
            </div>

            <div className="docs-preview-tags">
              {previewDoc.tags.map(tag => (
                <span key={tag} className="doc-tag">#{tag}</span>
              ))}
            </div>

            {/* Simulated preview */}
            <div className="docs-preview-body">
              <div className="docs-preview-watermark">
                CONFIDENCIAL · GOMB · {new Date().getFullYear()}
              </div>
              <div className="docs-preview-lines">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="docs-preview-line" style={{ width: `${70 + Math.random() * 30}%` }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" fullWidth icon={<Eye size={15} />}>Visualizar Completo</Button>
              <Button variant="outline" fullWidth icon={<Download size={15} />}>Baixar PDF</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
