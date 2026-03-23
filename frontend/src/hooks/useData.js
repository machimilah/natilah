import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { newsData, researchPageData, aboutPageData } from '../data/mockData';

function useSupabaseTable(table, fallback, orderBy = 'created_at', ascending = false) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) return;

    supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending })
      .then(({ data: rows, error }) => {
        if (!error && rows && rows.length > 0) setData(rows);
        setLoading(false);
      });
  }, [table, orderBy, ascending]);

  return { data, loading };
}

export function useNews() {
  const [data, setData] = useState(newsData);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) { console.warn('[Supabase] client is null — env vars missing'); return; }
    supabase.from('news').select('*').order('created_at', { ascending: false }).then(({ data: rows, error }) => {
      console.log('[Supabase] news fetch:', { rows, error });
      if (!error && rows && rows.length > 0) {
        setData(rows.map(r => ({
          id: r.id,
          date: r.date,
          title: r.title,
          excerpt: r.excerpt,
          fullContent: r.full_content,
          linkUrl: r.link_url,
        })));
      }
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useResearchPapers() {
  return useSupabaseTable('research_papers', researchPageData.papers, 'date', false);
}

export function useTeam() {
  return useSupabaseTable('team', aboutPageData.team, 'order', true);
}
