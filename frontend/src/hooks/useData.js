import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function useSupabaseTable(table, fallback, orderBy = 'created_at', ascending = false) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) return;

    const fetchData = () => {
      supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending })
        .then(({ data: rows, error }) => {
          if (!error && Array.isArray(rows)) setData(rows);
          setLoading(false);
        });
    };

    fetchData();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        fetchData(); // Refetch data when a change occurs
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, orderBy, ascending]);

  return { data, loading };
}

export function useNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) { console.warn('[Supabase] client is null — env vars missing'); return; }

    const fetchNews = () => {
      supabase.from('news').select('*').order('created_at', { ascending: false }).then(({ data: rows, error }) => {
        console.log('[Supabase] news fetch:', { rows, error });
        if (!error && Array.isArray(rows)) {
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
    };

    fetchNews();

    // Subscribe to real-time changes for the news table
    const channel = supabase
      .channel('news_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => {
        fetchNews(); // Refetch data when a change occurs
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading };
}

export function useResearchPapers() {
  return useSupabaseTable('research_papers', [], 'date', false);
}

export function useTeam() {
  return useSupabaseTable('team', [], 'order', true);
}
